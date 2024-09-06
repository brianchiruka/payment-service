import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'
import { BadRequestError } from '../utils/errors'

export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error) {
      next(new BadRequestError(error.details[0].message))
    } else {
      next()
    }
  }
