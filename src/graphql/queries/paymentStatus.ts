export const GET_PAYMENT_STATUS = `
query GetPaymentRequestStatus($paymentRequestId: ID!) {
    node(id: $paymentRequestId) {
      ... on PaymentInitiationRequest {
        id
        payerReference
        beneficiaryReference
        url
        state {
          __typename
          ... on PaymentInitiationRequestCompleted {
            date
            amount
            payer {
              ... on PaymentInitiationBankAccountPayer {
                accountNumber
                bankId
              }
            }
          }
          ... on PaymentInitiationRequestCancelled {
            date
            reason
          }
          ... on PaymentInitiationRequestPending {
            __typename
            paymentInitiationRequest {
              id
            }
          }
          ... on PaymentInitiationRequestExpired {
            __typename
            date
          }
        }
      }
    }
  }`
