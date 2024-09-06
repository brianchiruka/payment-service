import { GET_PAYMENT_STATUS } from '../graphql/queries/paymentStatus'
import { getGraphQLClient } from '../graphql/client'
import {
  CLIENT_PAYMENT_REQUEST,
  USER_PAYMENT_INITIATE,
} from '../graphql/queries/createPaymentRequest'
import { SIMULATE_PAYMENT_CONFIRMATION } from '../graphql/queries/simulatePaymentConfirmation'
import {
  ClientPaymentRequest,
  PaymentRequestResponse,
  PaymentStatusInfo,
  SimulatePaymentConfirmation,
  UserPaymentRequest,
} from '../models/payments.types'

export const createUserPayment = async (
  paymentRequest: UserPaymentRequest
): Promise<PaymentRequestResponse> => {
  const client = await getGraphQLClient(paymentRequest.user.userId, [
    'client_paymentrequest',
  ])

  try {
    const variables = {
      input: {
        amount: {
          quantity: paymentRequest.amount,
          currency: paymentRequest.currency,
        },
        expireAt: paymentRequest.expireAt,
        payerReference: paymentRequest.user.userId,
        beneficiaryReference: paymentRequest.user.fullname,
        externalReference: paymentRequest.externalReference,
        merchant: paymentRequest.merchant,
        payerInformation: {
          fullName: paymentRequest.user.fullname,
          bankAccountNumber: paymentRequest.user.bankAccountNumber,
          email: paymentRequest.user.email,
          mobileNumber: paymentRequest.user.mobileNumber,
          accountCreatedDate: paymentRequest.user.accountCreatedDate,
        },
      },
    }

    const response = await client.mutation(USER_PAYMENT_INITIATE, variables)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createClientPayment = async (
  paymentRequest: ClientPaymentRequest
): Promise<PaymentRequestResponse> => {
  const client = await getGraphQLClient(paymentRequest.user.userId, [
    'client_paymentrequest',
  ])

  try {
    const variables = {
      amount: {
        quantity: paymentRequest.amount,
        currency: paymentRequest.currency,
      },
      payerReference: paymentRequest.user.userId,
      beneficiaryReference: paymentRequest.user.fullname,
      beneficiaryName: paymentRequest.user.fullname,
      beneficiaryBankId: paymentRequest.user.bankAccountName,
      beneficiaryAccountNumber: paymentRequest.user.bankAccountNumber,
    }

    const response = await client.mutation(CLIENT_PAYMENT_REQUEST, variables)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getPaymentStatus = async (paymentInfo: PaymentStatusInfo) => {
  const { userId, paymentRequestId } = paymentInfo
  const client = await getGraphQLClient(userId, ['client_paymentrequest'])

  try {
    const variables = { paymentRequestId }
    const response = await client.query(GET_PAYMENT_STATUS, variables)
    return response.data
  } catch (error) {
    throw error
  }
}

export const simulateClientPaymentConfirmation = async (
  paymentInfo: SimulatePaymentConfirmation
) => {
  const { userId, paymentRequestId } = paymentInfo
  const client = await getGraphQLClient(userId, ['client_paymentrequest'])

  try {
    const variables = { paymentRequestId }
    const response = await client.query(
      SIMULATE_PAYMENT_CONFIRMATION,
      variables
    )
    return response.data
  } catch (error) {
    throw error
  }
}
