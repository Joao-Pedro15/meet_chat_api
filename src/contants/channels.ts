import { Server, Socket } from "socket.io";


export function getChannel(io: Server) {
  return {
   channel01: io.of('/channel01'),
   channel02: io.of('/channel02'),
   channel03: io.of('/channel03'),
   channel04: io.of('/channel04'),
  }
}