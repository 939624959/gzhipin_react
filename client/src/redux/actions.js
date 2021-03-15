/*
包含n个action creator
异步action
同步action
*/
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESER_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ} from './action-type'
import {reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList, reqChatMsgList, reqReadMsg} from '../api/index'
import {io} from 'socket.io-client'
//建立前台与后台通讯连接
function initIO(dispatch, userId) {
  if (!io.socket) {
    io.socket = io('ws://localhost:4000', {transports: ['websocket']})
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log(chatMsg);
      if (userId === chatMsg.from || userId === chatMsg.to) {
        dispatch(receiveMsg(chatMsg, userId))
      }
    })
  }
}
//异步获取消息列表
async function getMsgList (dispatch, userId) {
  initIO(dispatch, userId)
  const response = await reqChatMsgList()
  const result = response.data // data: {users: {}, chatMsgs：[]}
  if (result.code === 0) {
    const {users, chatMsgs} = result.data
    dispatch(receiveMsgList({users, chatMsgs, userId}))
  }
}


//发送消息的异步action
export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    io.socket.emit('sendMsg', {from, to, content})
  }
}

//更新消息状态的异步action： 未读--->已读
export const readMsg = (from, to) => {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const result = response.data
    if (result.code === 0) {
      const count = result.data
      dispatch(msgRead({count, from, to}))
    }
  }
}
//更改消息状态的同步action
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})
//接收单条消息的同步action
const receiveMsg = (chatMsg, userId) => ({type: RECEIVE_MSG, data: {chatMsg, userId}})
//接收全部消息的同步action
const receiveMsgList = ({users, chatMsgs, userId}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userId}})
//授权成功的同步action
const authSuccess = user => ({type: AUTH_SUCCESS, data: user})
//错误提示信息的同步action
const errorMsg = msg => ({type: ERROR_MSG, data: msg})
//接收用户的同步action
const receiveUser = user => ({type: RECEIVE_USER, data: user})
//重置用户的同步action
export const resetUser = msg => ({type: RESER_USER, data: msg})
//获取用户列表的同步action
const receiveUserList = users => ({type: RECEIVE_USER_LIST, data: users})

//注册的异步action
export const register = (user) => {
  const {username, password, password2, type} = user
  if (!username) {
    return errorMsg('用户名不能为空')
  } else if (password !== password2) {
    return errorMsg('两次密码要一致')
  }

  return async dispatch => {
    const response = await reqRegister({username, password, type})
    const result = response.data //{code: 0, data: user, msg: ''}
    if (result.code === 0) { //成功
      getMsgList(dispatch, result.data._id)
      //分发授权成功的同步action
      dispatch(authSuccess(result.data))
    } else {//失败
      //分发错误信息提示的同步action
      dispatch(errorMsg(result.msg))
    }
  }
}
//登陆的异步action
export const login = (user) => {

  const {username, password} = user
  if (!username) {
    return errorMsg('用户名不能为空')
  } else if (!password) {
    return errorMsg('密码不能为空')
  }

  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if (result.code === 0) { //成功
      getMsgList(dispatch,result.data._id)
      //分发授权成功的同步action
      dispatch(authSuccess(result.data))
    } else {//失败
      //分发错误信息提示的同步action
      dispatch(errorMsg(result.msg))
    }
  }
}
//更新用户的异步action 完善用户信息
export const updateUser = user => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data  //{code: 0, data: user}
    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg) )
    }
  }
}
//获取用户异步action 实现自动登陆
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}
//获取用户列表的异步action
export const getUserList = (type) =>{
  return async dispatch => {
    // debugger
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}
