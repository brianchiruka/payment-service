import { RefundRequest, RefundResponse } from '../models/refunds.types'
import { getGraphQLClient } from '../graphql/client'
import { REQUEST_REFUND } from '../graphql/queries/requestRefund'

export const requestRefund = async (
  refundRequest: RefundRequest
): Promise<RefundResponse> => {
  const client = await getGraphQLClient(refundRequest.userId, ['client_refund'])

  try {
    const variables = { refundRequest }
    const response = await client.mutation(REQUEST_REFUND, variables)
    return response.data
  } catch (error) {
    throw error
  }
}
