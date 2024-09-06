import dotenv from 'dotenv'
import Joi from 'joi'
import fs from 'fs'
import path from 'path'
import { KeyManagementServiceClient } from '@google-cloud/kms'

dotenv.config()

const clientJsonPath = path.join(__dirname, '..', 'client.json')
let clientData: { client?: { id: string }; secret?: { value: string } } = {}
let config: any = {}

try {
  clientData = JSON.parse(fs.readFileSync(clientJsonPath, 'utf8'))
} catch (error) {
  console.log(
    'client.json not found, reading Stitch client credentials from .env'
  )
}

const requiredInNonTest = (field: Joi.StringSchema) =>
  field.when('NODE_ENV', { is: 'test', otherwise: Joi.required() })

const envSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  WEBHOOK_URL: Joi.string().required(),
  REDIRECT_URL: Joi.string().required(),

  KEYS_KMS_PROJECT_ID: requiredInNonTest(Joi.string()),
  KEYS_KMS_LOCATION_ID: requiredInNonTest(Joi.string()),
  KEYS_KMS_KEY_RING_ID: requiredInNonTest(Joi.string()),
  KEYS_KMS_KEY_ID: requiredInNonTest(Joi.string()),

  PORT: Joi.number().default(4000),
  STITCH_TOKEN_URL: Joi.string()
    .uri()
    .default('https://secure.stitch.money/connect/token'),
  STITCH_API_URL: Joi.string()
    .uri()
    .default('https://api.stitch.money/graphql'),

  STITCH_CLIENT_ID: Joi.string().default(clientData?.client?.id),
  STITCH_CLIENT_SECRET: Joi.string().default(clientData?.secret?.value),
  STITCH_CLIENT_SECRET_ENC: Joi.string().optional(),

  KEYCLOAK_AUDIENCE: requiredInNonTest(Joi.string()),
  KEYCLOAK_ISSUER: requiredInNonTest(Joi.string()),
  KEYCLOAK_ALGORITHM: Joi.string().default('RS256'),
  KEYCLOAK_JWK_URL: requiredInNonTest(Joi.string()),

  KMS_KEY_FILENAME: requiredInNonTest(Joi.string()),
}).unknown()

const { error, value: envVars } = envSchema.validate(process.env)

if (process.env.NODE_ENV !== 'test') {
  config = {
    port: envVars.PORT,
    webhookUrl: envVars.WEBHOOK_URL,
    redirectUrl: envVars.REDIRECT_URL,
    isTestEnv: false,
    stitch: {
      tokenUrl: envVars.STITCH_TOKEN_URL,
      apiUrl: envVars.STITCH_API_URL,
      clientId: envVars.STITCH_CLIENT_ID,
    },
    keycloak: {
      audience: envVars.KEYCLOAK_AUDIENCE,
      issuer: envVars.KEYCLOAK_ISSUER,
      algorithm: envVars.KEYCLOAK_ALGORITHM,
      jwkUrl: envVars.KEYCLOAK_JWK_URL,
    },
  }
} else {
  console.log('')
  console.log('🚨'.repeat(40))
  console.log('')
  console.log(
    '🚨      Running in Test environment, bypassing auth checks and KMS            🚨'
  )
  console.log('')
  console.log('🚨'.repeat(40))
  console.log('')
  config = {
    port: envVars.PORT,
    webhookUrl: envVars.WEBHOOK_URL,
    redirectUrl: envVars.REDIRECT_URL,
    isTestEnv: true,
    stitch: {
      tokenUrl: envVars.STITCH_TOKEN_URL,
      apiUrl: envVars.STITCH_API_URL,
      clientId: envVars.STITCH_CLIENT_ID,
    },
  }
}

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const kmsConfig = {
  projectId: envVars.KEYS_KMS_PROJECT_ID as string,
  locationId: envVars.KEYS_KMS_LOCATION_ID as string,
  keyRingId: envVars.KEYS_KMS_KEY_RING_ID as string,
  cryptoKeyId: envVars.KEYS_KMS_KEY_ID as string,
}

const getEncryptedValue = async (
  identifier: string,
  encryptedValue: string
): Promise<string | undefined> => {
  try {
    const client = new KeyManagementServiceClient({
      keyFilename: envVars.KMS_KEY_FILENAME as string,
    })

    const { projectId, keyRingId, cryptoKeyId, locationId } = kmsConfig

    const name = client.cryptoKeyPath(
      projectId,
      locationId,
      keyRingId,
      cryptoKeyId
    )
    const ciphertextBuffer = Buffer.from(encryptedValue, 'base64')

    const [decrypt] = await client.decrypt({
      name,
      ciphertext: ciphertextBuffer,
    })

    return (decrypt?.plaintext as Buffer)?.toString('utf8')
  } catch (e) {
    console.error(`Unable to decrypt config value for ${identifier}: ${e}`)
    return undefined
  }
}

const loadClientSecret = async (): Promise<string> => {
  const encryptedSecret = envVars.STITCH_CLIENT_SECRET_ENC
  const decryptedSecret = encryptedSecret
    ? await getEncryptedValue('STITCH_CLIENT_SECRET', encryptedSecret)
    : undefined
  return (
    decryptedSecret ||
    envVars.STITCH_CLIENT_SECRET ||
    clientData?.secret?.value ||
    ''
  )
}

const initConfig = async () => {
  const clientSecret = await loadClientSecret()
  const { error, value: validatedEnvVars } = envSchema.validate({
    ...envVars,
    STITCH_CLIENT_SECRET: clientSecret,
  })
  config.stitch.clientSecret = validatedEnvVars.STITCH_CLIENT_SECRET
}

config.init = initConfig

export { config }
