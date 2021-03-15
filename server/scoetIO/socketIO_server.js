const {ChatModel} = require('../db/models')
module.exports = function (server) {
  const io = require('socket.io')(server, {origins: "*"})
  io.on('connection', function (socket) {
    // console.log('又一个客户端连接')
    socket.on('sendMsg', function ({from, to, content}) {
      // console.log('收到消息')
      const chat_id = [from, to].sort().join('_')
      const create_time = Date.now()
      new ChatModel({from, to, chat_id, create_time, content}).save(function (error, chatMsg) {
        io.emit('receiveMsg', chatMsg)
      })
    })
  })
}
