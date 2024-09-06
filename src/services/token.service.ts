import { axiosRequest } from '../utils/axios'
import { config } from '../config'

interface ClientToken {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  refresh_token?: string
}

const tokenStore = new Map<string, ClientToken>()

export const getAccessToken = async (
  serviceId: string,
  scopes: string[]
): Promise<string> => {
  let token = tokenStore.get(serviceId)

  if (token && Date.now() < token.expires_in * 1000) {
    return token.access_token
  }
  token = await requestNewToken(scopes)
  tokenStore.set(serviceId, token)

  return token.access_token
}

const requestNewToken = async (scopes: string[]): Promise<ClientToken> => {
  const body = {
    grant_type: 'client_credentials',
    client_id: config.stitch.clientId,
    scope: scopes.join(' '),
    audience: config.stitch.tokenUrl,
    client_secret: config.stitch.clientSecret,
  }

  const token = await axiosRequest<ClientToken>(body, {
    method: 'POST',
    url: config.stitch.tokenUrl,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

  token.expires_in = Date.now() + token.expires_in * 1000
  return token
}
