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
  channel01.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('join-room', data => {
      socket.join(data)
    })
    socket.emit('getHistoricMessages', messagesChannel01)
    socket.on('teste', (data) => {
      console.log(data, 'ee');      
    } )
    socket.on('sendMessageToServer', (data, type) => {
      console.log('opa chegou!');
      
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