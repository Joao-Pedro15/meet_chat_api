import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server)


export default server