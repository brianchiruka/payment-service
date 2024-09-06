import { Router } from 'express'
import { requestRefund } from '../controllers/refund.controller'

const router = Router()

router.post('/', requestRefund)

export default router
