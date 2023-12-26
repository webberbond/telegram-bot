import { Bot, session } from 'grammy'
import { hydrateReply, parseMode } from '@grammyjs/parse-mode'
import { MyContext } from './types'
import { COMMANDS } from './commands'
import { conversations, createConversation } from '@grammyjs/conversations'
import { downloadShorts } from './functions/shorts.functions'
import { downloadReels } from './functions/reels.function'
import { downloadTikTok } from './functions/tiktok.function'
import * as dotenv from 'dotenv'

dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN || ''

const bot = new Bot<MyContext>(BOT_TOKEN)

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

bot.use(conversations())
bot.use(createConversation(downloadShorts))
bot.use(createConversation(downloadReels))
bot.use(createConversation(downloadTikTok))

bot.command('start', async (ctx) => {
  await ctx.reply(
    'Привет! Я бот для скачивания видео с YouTube Shorts, Instagram Reels и TikTok.'
  )
})

bot.command('shorts', async (ctx) => {
  await ctx.conversation.enter('downloadShorts')
})

bot.command('reels', async (ctx) => {
  await ctx.conversation.enter('downloadReels')
})

bot.command('tiktok', async (ctx) => {
  await ctx.conversation.enter('downloadTikTok')
})

bot.command('help', async (ctx) => {
  await ctx.reply(
    `*Commands:*\n\n${COMMANDS.map(
      (command) => `/${command.command} - ${command.description}`
    ).join('\n')}`
  )
})

bot.command('cancel', async (ctx) => {
  await ctx.reply('Leaving...')
})

export { bot }
