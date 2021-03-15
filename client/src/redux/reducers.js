/*
包含n个reducer函数：根据老的state和指定的action 返回一个新的state
*/
import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESER_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ} from './action-type'

import {getRedirectTo} from '../utils'


const initUser = {
  username: '',  //用户名
  type: '',  //用户类型 laoban/dashen
  msg: '',  //错误提示信息
  redirectTo: ''
}
//产生user状态的reducer
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const {type, header} = action.data
      return {...action.data, redirectTo: getRedirectTo(type, header)}
    case ERROR_MSG:
      return {...state, msg: action.data}
    case RECEIVE_USER:
      return action.data
    case RESER_USER:
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initUserList = []
//产生userList状态的reducer
function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  users: {}, //所有用户信息的对象 属性名：userId，属性值：{username, header}
  chatMsgs: [],  //当前用户所有相关msg的数组
  unreadCount: 0  //总的未读数量
}
//产生聊天状态的reducer
function chat(state=initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:  //data: {users, chatMsgs}
      const {users, chatMsgs, userId} = action.data
      return {
        users,
        chatMsgs,
        unreadCount: chatMsgs.reduce((preTotal, msg) => {
          return preTotal + (msg.to === userId && !msg.read ? 1 : 0)
        }, 0)
      }
    case RECEIVE_MSG:
      const {chatMsg} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unreadCount: state.unreadCount + (chatMsg.to === action.data.userId && !chatMsg.read ? 1 : 0)
      }
    case MSG_READ:
      const {count, from, to} = action.data
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg => {
          if (msg.from === from && msg.to === to && !msg.read) {
            return {...msg, read: true}
          } else {
            return msg
          }
        }),
        unreadCount: state.unreadCount - count
      }
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
  chat
})

//向外暴露的状态结构: {user: {}, userList: [], chat: {}}
