import express from 'express'
import http from 'http'
import path from 'path'

export async function createServer() {
  const app = express()
  const server = new http.Server(app)

  const client = path.resolve('__dirname', 'client')
  const data = path.resolve('__dirname', 'data')

  app.use(express.static(client))
  app.use(express.static(data))

  app.get('/', (req, res) => {
    res.send('Hey')
  })

  app.get('/test', (req, res) => {
    res.send('Hey there')
  })

  return server
}
