import Joi, { ObjectSchema } from 'joi'

export const userSchema: ObjectSchema = Joi.object({
  userId: Joi.string().required(),
  fullname: Joi.string().required(),
  bankAccountName: Joi.string().required(),
  bankAccountNumber: Joi.string().required(),
})

export const clientPaymentRequestSchema: ObjectSchema = Joi.object({
  amount: Joi.string().required(),
  currency: Joi.string().required(),
  user: userSchema,
})

export const userPaymentRequestSchema: ObjectSchema = Joi.object({
  amount: Joi.string().required(),
  currency: Joi.string().required(),
  user: {
    userId: Joi.string().required(),
    fullname: Joi.string().required(),
    bankAccountName: Joi.string().required(),
    bankAccountNumber: Joi.string().required(),
    email: Joi.string().optional(),
    mobileNumber: Joi.string().optional(),
    accountCreatedDate: Joi.string().optional(),
  },
  expireAt: Joi.string().optional(),
  externalReference: Joi.string().optional(),
  merchant: Joi.string().optional(),
})

export const paymentRequestStatusSchema: ObjectSchema = Joi.object({
  userId: Joi.string().required(),
})

export const simulatePaymentConfirmationSchema = clientPaymentRequestSchema
