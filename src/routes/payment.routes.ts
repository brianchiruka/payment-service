import { Router } from 'express'
import * as paymentController from '../controllers/payment.controller'
import {
  clientPaymentRequestSchema,
  paymentRequestStatusSchema,
  simulatePaymentConfirmationSchema,
  userPaymentRequestSchema,
} from '../models/payment.schemas'
import { validate } from '../middleware/validate'
import { config } from '../config'

const router = Router()

router.post(
  '/user',
  validate(userPaymentRequestSchema),
  paymentController.createUserPayment
)
router.post(
  '/client',
  validate(clientPaymentRequestSchema),
  paymentController.createClientPayment
)
router.get(
  '/status/:paymentRequestId',
  validate(paymentRequestStatusSchema),
  paymentController.getPaymentStatus
)

if (config.isTestEnv) {
  router.post(
    '/simulate/:paymentRequestId',
    validate(simulatePaymentConfirmationSchema),
    paymentController.simulatePaymentConfirmation
  )
}
export default router
