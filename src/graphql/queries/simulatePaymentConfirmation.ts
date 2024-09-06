export const SIMULATE_PAYMENT_CONFIRMATION = `
mutation TestClientPaymentConfirmation($paymentInitiationRequestId: ID!)
{
  testClientcreateClientPaymentConfirmation(input: {paymentRequestId: $paymentInitiationRequestId}) {
    paymentRequestId
  }
}`
