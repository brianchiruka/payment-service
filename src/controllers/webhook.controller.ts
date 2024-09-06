import { Request, Response, NextFunction } from 'express'
import { subscribeToStitchWebhook } from '../services/webhook.service'

export const subscribeToWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await subscribeToStitchWebhook()
    res.status(201).json({ message: 'Webhook subscription successful' })
  } catch (error) {
    next(error)
  }
}
