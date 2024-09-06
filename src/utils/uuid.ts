import crypto from 'crypto'

export function generateRandomUUID(): string {
  return crypto.randomUUID()
}
