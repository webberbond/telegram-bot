import { MyContext, MyConversation } from 'bot/types'
import { downloadReelsHelper } from '../helpers/reels.helper'

export async function downloadReels(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply('Введите ссылку на Instagram Reels')

  const { message } = await conversation.wait()

  await downloadReelsHelper(ctx, message.text)
}
