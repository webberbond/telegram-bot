import { webhookCallback } from 'grammy'
import { bot } from './bot'
const express = require('express')

const runBot = () => {
  if (process.env.NODE_ENV === 'production') {
    const app = express()
    app.use(express.json())
    app.use(webhookCallback(bot, 'express'))

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Bot listening on port ${PORT}`)
    })
  } else {
    bot.start()
  }
}

export { runBot }
