import express from 'express'
import bodyParser from 'body-parser'
import paymentRoutes from './routes/payment.routes'
import refundRoutes from './routes/refund.routes'
import { errorHandler } from './middleware/errorHander'
import { allRequestsLogger } from './middleware/logger'
import { config } from './config'
import { jwtVerification } from './middleware/jwt'
import { subscribeToWebhook } from './controllers/webhook.controller'

const app = express()

app.use(bodyParser.json())
app.use(allRequestsLogger)

if (!config.isTestEnv) {
  app.use(jwtVerification.unless({ path: ['/healthz'] }))
}

app.get('/healthz', (req, res) => {
  res.send('ok')
})

app.post('/webhooks', subscribeToWebhook)

app.use('/payments', paymentRoutes)
app.use('/refunds', refundRoutes)

app.use(errorHandler)
export default app
