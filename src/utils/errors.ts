export class ApiError extends Error {
  public status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    Error.captureStackTrace(this, this.constructor)
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(400, message)
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(404, message)
  }
}
