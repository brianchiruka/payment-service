import { Client, cacheExchange, fetchExchange } from '@urql/core'
import { config } from '../config'
import { getAccessToken } from '../services/token.service'

export const getGraphQLClient = async (
  userId: string,
  scopes: string[]
): Promise<Client> => {
  try {
    const token = await getAccessToken(userId, scopes)
    if (!token) {
      throw new Error('Failed to obtain access token')
    }

    return new Client({
      url: config.stitch.apiUrl,
      exchanges: [cacheExchange, fetchExchange],
      fetchOptions: {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        credentials: 'include',
        mode: 'cors',
      },
    })
  } catch (error) {
    throw error
  }
}
