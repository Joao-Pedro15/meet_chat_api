import { Socket as ClientSocket, io as Client } from 'socket.io-client'
import { Server as HttpServer, createServer } from 'http'
import { Server } from 'socket.io'
import { socketServer } from '../src/app'
import { AddressInfo } from 'net'

describe('Socket Testing', () => {
  let clientSocket: ClientSocket
  let httpServer: HttpServer
  let io: Server

  beforeEach((done) => {
    httpServer = createServer()
    io = socketServer(httpServer)
    httpServer.listen(() => {
      done()
    })
  })

  afterEach(() => {
    httpServer.close()
    io.close()
  })

  it('should return what it sends', (done) => {
    clientSocket = Client(`http://localhost:${(httpServer.address() as AddressInfo).port}/channel01`)
    clientSocket.on('loadMessages', msg => {
      expect(msg.messages).toEqual(['opa mensagem 1'])
      clientSocket.close()
      done()
    })
  })
  it('should return what it sends', (done) => {
    clientSocket = Client(`http://localhost:${(httpServer.address() as AddressInfo).port}/channel01`)
    clientSocket.on('sendMessage', msg => {
      expect(msg.messages).toEqual(['opa mensagem 1'])
      clientSocket.close()
      done()
    })
  })
})

