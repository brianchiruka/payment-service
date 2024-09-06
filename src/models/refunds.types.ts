export interface RefundRequest {
  userId: string
  paymentRequestId: string
  amount: {
    currency: string
    amount: number
  }
  reason: RefundReason
  nonce: string
  beneficiaryReference: string
  clearingType?: ClearingType
}

enum RefundReason {
  DUPLICATE = 'duplicate',
  FRAUDULENT = 'fraudulent',
  REQUESTED_BY_USER = 'requested_by_user',
}

enum ClearingType {
  INSTANT = 'INSTANT',
  DEFAULT = 'DEFAULT',
}

export interface RefundResponse {
  refund: {
    id: string
    status: string
    reason: string | null
    amount: {
      currency: string
      amount: number
    }
    created: Date | string
    beneficiaryReference?: string
    paymentInitiationRequest?: {
      id: string
    }
    paymentInitiation?: {
      id: string
    }
    nonce: string
  }
}
