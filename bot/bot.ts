import { Bot, GrammyError, HttpError, InputFile, session } from 'grammy'
import { hydrateReply, parseMode } from '@grammyjs/parse-mode'
import type { ParseModeFlavor } from '@grammyjs/parse-mode'
import { BotContext } from './types'
import { COMMANDS } from './commands'
import * as dotenv from 'dotenv'
import { downloadShorts } from './helpers/shorts.helper'

dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN || ''

const bot = new Bot<ParseModeFlavor<BotContext>>(BOT_TOKEN)

bot.use(hydrateReply)

bot.api.setMyCommands(COMMANDS)
bot.api.config.use(parseMode('Markdown'))

bot.use(
  session({
    initial() {
      return {}
    },
  })
)

bot.command('start', async (ctx) => {
  await ctx.conversation.enter('startConversation')
})

bot.command('shorts', async (ctx) => {
  await ctx.reply('Введите ссылку на YouTube Shorts')
  bot.on('message:text', async (ctx) => {
    const url = ctx.message.text

    await downloadShorts(ctx, url)
  })
})

bot.command('help', async (ctx) => {
  await ctx.reply(
    `*Commands:*\n\n${COMMANDS.map(
      (command) => `/${command.command} - ${command.description}`
    ).join('\n')}`
  )
})

bot.command('cancel', async (ctx) => {
  await ctx.conversation.exit()
  await ctx.reply('Leaving...')
})

export { bot }
