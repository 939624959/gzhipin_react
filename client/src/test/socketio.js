import { io } from "socket.io-client";

const socket = io('ws://localhost:4000')
socket.on('receiveMsg', function (data) {
  console.log('浏览器收到消息', data)
})
socket.emit('sendMsg', {name: 'abc'})
console.log('浏览器发送消息', {name: 'abc'})
