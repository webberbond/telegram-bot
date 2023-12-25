import { Bot, session } from 'grammy'
import { hydrateReply, parseMode } from '@grammyjs/parse-mode'
import type { ParseModeFlavor } from '@grammyjs/parse-mode'
import { BotContext } from './types'
import { COMMANDS } from './commands'
import * as dotenv from 'dotenv'
import { downloadShorts } from './helpers/shorts.helper'
import { downloadReels } from './helpers/reels.helper'
import { downloadTikTok } from './helpers/tiktok.helper'

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
  await ctx.reply(
    'Привет! Я бот для скачивания видео с YouTube Shorts, Instagram Reels и TikTok.'
  )
})

bot.command('shorts', async (ctx) => {
  await ctx.reply('Введите ссылку на YouTube Shorts')
  bot.on('message:text', async (ctx) => {
    const url = ctx.message.text

    await downloadShorts(ctx, url)
  })
})

bot.command('reels', async (ctx) => {
  await ctx.reply('Введите ссылку на Instagram Reels')
  bot.on('message:text', async (ctx) => {
    const url = ctx.message.text

    await downloadReels(ctx, url)
  })
})

bot.command('tiktok', async (ctx) => {
  await ctx.reply('Введите ссылку на TikTok Видео')
  bot.on('message:text', async (ctx) => {
    const url = ctx.message.text

    await downloadTikTok(ctx, url)
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
