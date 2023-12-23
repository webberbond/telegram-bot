import { runBot } from './bot'

const runApp = async () => {
  try {
    runBot()
  } catch (error: any) {
    console.log(`[runApp][Error on run app]`, {
      metadata: { error: error, stack: error.stack.toString() },
    })
  }
}

runApp()
