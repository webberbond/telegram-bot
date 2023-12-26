import axios from 'axios'
import { MyContext } from 'bot/types'
import { InputFile } from 'grammy'

export async function downloadTikTokHelper(ctx: MyContext, tiktokUrl: string) {
  try {
    const options = {
      method: 'GET',
      url: 'https://tiktok-download-video1.p.rapidapi.com/getVideo',
      params: {
        url: tiktokUrl,
        hd: '1',
      },
      headers: {
        'X-RapidAPI-Key': 'a4dfd05044mshfdb8a6dce0927d1p1ef9cajsnbbb8803ce90a',
        'X-RapidAPI-Host': 'tiktok-download-video1.p.rapidapi.com',
      },
    }
    const response = await axios.request(options)

    const videoUrl = response.data.data.play

    const videoResponse = await axios.get(videoUrl, {
      responseType: 'arraybuffer',
    })
    const videoBuffer = Buffer.from(videoResponse.data)

    const maxFileSize = 50 * 1024 * 1024
    if (videoBuffer.length <= maxFileSize) {
      await ctx.replyWithChatAction('upload_video')
      await ctx.replyWithVideo(new InputFile(videoBuffer), {
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
  } catch (error) {
    console.error(error)
    await ctx.reply(`*Произошла ошибка.*\n_${error.message}_`, {
      reply_to_message_id: ctx.message.message_id,
    })
  }
}
