import { WEBHOOK_SUBSCRIPTION } from '../graphql/queries/webhook'
import { config } from '../config'
import { getGraphQLClient } from '../graphql/client'
import { WebhookResponse } from '../models/webhook.types'
import { getAccessToken } from './token.service'
import { generateRandomUUID } from '../utils/uuid'

export const subscribeToStitchWebhook = async (): Promise<WebhookResponse> => {
  const uniqueId = generateRandomUUID()
  const token = await getAccessToken(uniqueId, [
    'openid',
    'client_paymentrequest',
    'paymentinitiationrequest',
    'client_paymentauthorizationrequest',
    'client_refund',
  ])
  const client = await getGraphQLClient(token, config.stitch.apiUrl)

  const result = await client
    .mutation(WEBHOOK_SUBSCRIPTION, { url: config.webhookUrl })
    .toPromise()

  return result.data
}
