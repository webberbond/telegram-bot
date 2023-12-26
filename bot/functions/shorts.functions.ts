import { MyContext, MyConversation } from 'bot/types'
import { downloadShortsHelper } from 'bot/helpers/shorts.helper'

export async function downloadShorts(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply('Введите ссылку на YouTube Shorts')

  const { message } = await conversation.wait()

  await downloadShortsHelper(ctx, message.text)
}
