import { MyContext, MyConversation } from 'bot/types'
import { downloadTikTokHelper } from 'bot/helpers/tiktok.helper'

export async function downloadTikTok(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply('Введите ссылку на TikTok Видео')

  const { message } = await conversation.wait()

  await downloadTikTokHelper(ctx, message.text)
}
