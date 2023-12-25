import { BotContext } from 'bot/types'
import { InputFile } from 'grammy'

const ytdl = require('ytdl-core')
const checkIfYoutubeShorts = require('identify-youtube-shorts')

export async function downloadShorts(ctx: BotContext, url: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/
  const match = urlRegex.exec(url)
  if (!match) {
    await ctx.reply('*Введите корректную ссылку на YouTube Shorts*', {
      reply_to_message_id: ctx.message.message_id,
    })
    return
  }

  const yturl = match[1]
  const id = ytdl.getURLVideoID(yturl)
  if (!(await checkIfYoutubeShorts(id))) {
    await ctx.reply('*Введите корректную ссылку на YouTube Shorts*', {
      reply_to_message_id: ctx.message.message_id,
    })
    return
  }
  await ctx.replyWithChatAction('upload_video')

  try {
    let info = await ytdl.getInfo(id)
    let format = ytdl.chooseFormat(info.formats, {
      quality: 22,
    })
    const video = await fetch(format.url)

    if (video.ok) {
      const buffer = Buffer.from(await video.arrayBuffer())
      const maxFileSize = 50 * 1024 * 1024
      if (buffer.length <= maxFileSize) {
        await ctx.replyWithChatAction('upload_video')
        await ctx.replyWithVideo(new InputFile(buffer), {
          height: 1920,
          width: 1080,
          supports_streaming: true,
        })
      } else {
        await ctx.reply(
          '*Размер файла очень большой.*\n_Файл не может быть скачан из-за лимитов Telegram_.',
          {
            reply_to_message_id: ctx.message.message_id,
          }
        )
      }
    } else {
      throw new Error('Ошибка в скачивании gif файла.')
    }
  } catch (error) {
    if (error.message.includes('Формат не найден:')) {
      console.log('Формат не найден')
    }
    console.log(error)
    await ctx.reply(`*Произошла ошибка.*\n_${error.message}_`, {
      reply_to_message_id: ctx.message.message_id,
    })
  }
}
