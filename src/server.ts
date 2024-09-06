import app from './app'
import { config } from './config'
import { subscribeToStitchWebhook } from './services/webhook.service'
;(async () => {
  try {
    await config.init()
    await subscribeToStitchWebhook()

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`)
    })
  } catch (error) {
    console.error('Failed server start up: ', error)
    process.exit(1)
  }
})()
