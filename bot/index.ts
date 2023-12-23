import { run } from '@grammyjs/runner'
import { bot } from './bot'

const runBot = () => {
  if (!bot.isInited()) {
    console.log('Bot is not inited')
    run(bot)
  }
}

export { runBot }
