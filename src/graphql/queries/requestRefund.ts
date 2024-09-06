export const REQUEST_REFUND = `
  mutation ClientRefundInitiate($input: ClientRefundInitiateInput!) {
    clientRefundInitiate(input: $input) {
      refund {
        id
        status
        reason
        amount {
          currency
          amount
        }
        created
        beneficiaryReference
        paymentInitiationRequest {
          id
        }
        paymentInitiation {
          id
        }
        nonce
      }
    }
  }
`
