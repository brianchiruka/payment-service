import { Request, Response, NextFunction } from 'express'
import * as refundService from '../services/refund.service'
import { generateRandomUUID } from '../utils/uuid'

export const requestRefund = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refundData = req.body
    refundData.nounce = generateRandomUUID()
    const result = await refundService.requestRefund(refundData)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}
