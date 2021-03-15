module.exports = function (server) {
  const io = require('socket.io')(server)
  io.on('connection', function (socket) {
    socket.on('sendMsg', function (data) {
      console.log('客户端收到消息', data);
      io.emit('receiveMsg', data.name.toUpperCase())
      console.log('客户端发送消息', data.name.toUpperCase())
    })
  })
}
