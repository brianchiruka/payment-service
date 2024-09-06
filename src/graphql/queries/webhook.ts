export const WEBHOOK_SUBSCRIPTION = `
mutation clientWebhookAdd($url: URL!) {
    clientWebhookAdd(input: {
      url: $url,
      filterTypes: ["refund", "payment.confirmation", "payment-initiation", "payment-initiation.confirmation", "payment"]
    }) {
      url
      filterTypes
      secret
      id
    }
  }`
