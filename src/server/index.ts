import server from '../app'
const PORT = process.env.PORT  || 3003 

server.listen(PORT, () => {
  console.log('server running on PORT', PORT);
})