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
    // let message:string = 'mensagem-channel01'
    clientSocket.on('teste', msg => {
      expect(msg).toBe('connectou')
      clientSocket.close()
      done()
    })
    // clientSocket.emit('connect', message)
    // clientSocket.on('resp_connect', (msg) => {
    //   expect(msg).toBe(message)
    //   clientSocket.close()
    //   done()
    // })
  })
})

