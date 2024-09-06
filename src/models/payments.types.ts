export interface User {
  userId: string
  fullname: string
  bankAccountName: string
  bankAccountNumber: string
}

export interface ClientPaymentRequest {
  amount: string
  currency: string
  user: User
}

export interface PaymentStatusInfo {
  paymentRequestId: string
  userId: string
}

export type SimulatePaymentConfirmation = PaymentStatusInfo

export interface PaymentRequestResponse {
  clientPaymentInitiationRequestCreate: {
    paymentInitiationRequest: {
      id: string
      url: string
    }
  }
}

export interface UserPaymentRequest {
  amount: string
  currency: string
  user: {
    userId: string
    fullname: string
    bankAccountName: string
    bankAccountNumber: string
    email?: string
    mobileNumber?: string
    accountCreatedDate?: string
  }
  expireAt?: string
  externalReference?: string
  merchant?: string
}
