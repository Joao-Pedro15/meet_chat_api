import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
const app = express()
app.use(cors())
const server = http.createServer(app)

export function socketServer(httpServer: http.Server) {
  const io = new Server(httpServer)
  io.on('connection', (socket: Socket) => {
    socket.on('hello', (msg: string) => {
      io.emit('hello', msg)
    })
  })
  return io
}

socketServer(server)

export default server