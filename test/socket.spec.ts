import { Socket as ClientSocket, io as Client } from 'socket.io-client'
import { Server as HttpServer, createServer } from 'http'
import { Server } from 'socket.io'
import { socketServer } from '../src/app'
import { AddressInfo } from 'net'

describe('Socket Testing', () => {
  it('ss', () => {
    expect(1+1).toEqual(2)
  })
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
    clientSocket = Client(`http://localhost:${(httpServer.address() as AddressInfo).port}`)
    let msg:string = 'mensagem'
    clientSocket.emit('hello', msg)
    clientSocket.on("hello", (msg) => {
      expect(msg).toBe(msg)
      clientSocket.close()
      done()
    })
  })
})

