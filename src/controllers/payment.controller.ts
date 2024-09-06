import { Request, Response, NextFunction } from 'express'
import * as paymentService from '../services/payment.service'

export const createUserPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentData = req.body
    const result = await paymentService.createUserPayment(paymentData)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export const createClientPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentData = req.body
    const result = await paymentService.createClientPayment(paymentData)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export const getPaymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentInfo = {
      userId: req.body.userId,
      paymentRequestId: req.params.paymentRequestId,
    }
    const result = await paymentService.getPaymentStatus(paymentInfo)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export const simulatePaymentConfirmation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentInfo = {
      userId: req.body.userId,
      paymentRequestId: req.params.paymentRequestId,
    }
    const result =
      await paymentService.simulateClientPaymentConfirmation(paymentInfo)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}
