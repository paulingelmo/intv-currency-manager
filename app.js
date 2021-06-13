import { createServer } from './server.js'

const exit = () => setTimeout(() => process.exit(1), 1000)
const PORT = 3000

;(async function main() {
  try {
    const server = await createServer()
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (err) {
    console.log('An error occurred while starting up the server', err)
    exit()
  }
})()
