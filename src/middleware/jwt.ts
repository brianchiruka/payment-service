import { expressjwt } from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import { config } from '../config'

const jwtConfig = {
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.keycloak?.jwkUrl,
  }) as any, // jwks-rsa doesn't have TS support for actions yet - not a big concern.

  audience: config.keycloak?.audience,
  issuer: config.keycloak?.issuer,
  algorithms: [config.keycloak?.algorithm],
}

export const jwtVerification = expressjwt(jwtConfig)
