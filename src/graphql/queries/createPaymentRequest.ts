export const CLIENT_PAYMENT_REQUEST = `
mutation createClientPaymentRequest(
    $amount: MoneyInput!,
    $payerReference: String!,
    $beneficiaryReference: String!,
    $beneficiaryName: String!,
    $beneficiaryBankId: BankBeneficiaryBankId!,
    $beneficiaryAccountNumber: String!) {
  clientPaymentInitiationRequestCreate(input: {
      amount: $amount,
      payerReference: $payerReference,
      beneficiaryReference: $beneficiaryReference,
      beneficiary: {
          bankAccount: {
              name: $beneficiaryName,
              bankId: $beneficiaryBankId,
              accountNumber: $beneficiaryAccountNumber
          }
      }
    }) {
    paymentInitiationRequest {
      id
      url
    }
  }
}`

export const USER_PAYMENT_INITIATE = `
mutation userInitiatePayment(
  $amount: MoneyInput!,
  $expireAt: Date,
  $payerReference: String,
  $beneficiaryReference: String,
  $externalReference: String,
  $merchant: String,
  $payerInformation: PayerInformationInput
) {
  userInitiatePayment(input: {
    amount: $amount,
    expireAt: $expireAt,
    payerReference: $payerReference,
    beneficiaryReference: $beneficiaryReference,
    externalReference: $externalReference,
    merchant: $merchant,
    payerInformation: $payerInformation
  }) {
    paymentInitiation {
      id
      date
      amount {
        quantity
        currency
      }
      status
      payerReference
      beneficiaryReference
      merchant
      expireAt
    }
  }
}`
