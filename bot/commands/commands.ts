interface Commands {
  command: string
  description: string
}

export const COMMANDS: Commands[] = [
  { command: '/shorts', description: 'Download YouTube Shorts Video' },
  { command: '/reels', description: 'Download Instagram Reels Video' },
]
