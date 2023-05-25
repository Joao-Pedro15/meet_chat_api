import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { getChannel } from '../src/contants/channels'
const app = express()
app.use(cors())
const server = http.createServer(app)


export function socketServer(httpServer: http.Server) {
  const io = new Server(httpServer)
  const { channel01, channel02 } = getChannel(io)
  channel01.on('connection', (socket) => {
    socket.emit('teste', 'connectou')
  })
  channel02.on('connection', (socket) => {
    socket.emit('teste', 'connectou no dois')
  })
  return io
}

socketServer(server)

export default server