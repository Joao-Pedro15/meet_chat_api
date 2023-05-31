import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { getChannel } from '../src/contants/channels'
import { Message } from './interfaces/message'
let messagesChannel01: Message[] = [{createdAt: new Date().toISOString(), id: "wepofwepfojwef", imageType: 'anya', message: "opa", userId: "ewfwef", userName: "Joaozim"}]
const app = express()
app.use(cors())
app.use((request, response, next)=>{  
  response.set({
    'Access-Control-Allow-Origin': '*'
  })
  next()
})
const server = http.createServer(app)


export function socketServer(httpServer: http.Server) {
  const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

const { channel01, channel02 } = getChannel(io)
  channel01.on('connection', (socket:Socket) => {
    socket.emit('getHistoricMessages', messagesChannel01)
    socket.on('join-room', data => {
      socket.join(data)
    })

    socket.on('listUsersInRoom', async (data) => {
      const room = data.room
      const rooms = channel01.adapter.rooms
      if(rooms.has(room)) {
        const users = await channel01.in(room).fetchSockets()
        return socket.emit('getUsersInRoom', users)
      }
      return socket.emit('getUsersInRoom', null)
    })

    socket.on('sendMessageToServer', (data, type) => {      
      messagesChannel01.push(data)
      channel01.emit('resendMessageToApp', data)
    })
  })

  channel02.on('connection', (socket) => {
    socket.emit('teste', 'connectou no dois')
  })
  return io
}

socketServer(server)

export default server