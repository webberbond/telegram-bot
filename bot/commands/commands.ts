interface Commands {
  command: string
  description: string
}

export const COMMANDS: Commands[] = [
  { command: '/start', description: 'Start the bot' },
  { command: '/shorts', description: 'Download YouTube Shorts Video' },
  { command: '/reels', description: 'Download Instagram Reels Video' },
  { command: '/tiktok', description: 'Download TikTok Video' },
]
