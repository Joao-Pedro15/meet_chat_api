import { Server, Socket } from "socket.io";

export function joinRoom(io: Server) {
  io.on('join-room', (socket:Socket) => {
    const room = socket.handshake.query.room
    if(!room) return socket.disconnect()
    socket.join(room)
    return room
  })
}