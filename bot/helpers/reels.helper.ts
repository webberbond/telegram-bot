import axios from 'axios'
import { MyContext } from 'bot/types'
import { InputFile } from 'grammy'

export async function downloadReelsHelper(ctx: MyContext, instaUrl: string) {
  try {
    const options = {
      method: 'GET',
      url: 'https://instagram-media-downloader.p.rapidapi.com/rapid/post.php',
      params: { url: instaUrl },
      headers: {
        'X-RapidAPI-Key': '25415b622emshc4c6c96d8990326p111fb7jsn0ea4a69a9112',
        'X-RapidAPI-Host': 'instagram-media-downloader.p.rapidapi.com',
      },
    }
    const response = await axios.request(options)
    console.log(response.data)
    const videoUrl = response.data.video

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
