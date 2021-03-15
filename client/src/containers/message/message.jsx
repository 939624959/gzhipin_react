import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief

//得到最后消息数组
function getLastMsg(chatMsgs, userId) {
  //定义最后消息对象 {chat_id: msg}
  const lastMsgObjs = {}
  chatMsgs.forEach(msg => {
    //对单个msg做未读标识
    if (msg.to === userId && !msg.read) {
      msg.unreadCount = 1
    } else {
      msg.unreadCount = 0
    }

    //得到聊天标识
    const chatId = msg.chat_id
    //获取已存在的当前id的lastMsg
    let lastMsg = lastMsgObjs[chatId]
    if (!lastMsg) {
      lastMsgObjs[chatId] = msg
    } else {
      //获取分组的更新的未读数量
      const unreadCount = lastMsg.unreadCount + msg.unreadCount
      if (lastMsg.create_time < msg.create_time) {
        lastMsgObjs[chatId] = msg
      }
      //更新分组的未读数量
      lastMsgObjs[chatId].unreadCount = unreadCount
    }
  })
  //获取最后消息数组
  const lastMsgs = Object.values(lastMsgObjs)
  //给最后消息数组排序
  lastMsgs.sort(function (m1, m2) {
    return m2.create_time - m1.create_time
  })
  return lastMsgs
}

class Message extends Component {

  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    const lastMsgs = getLastMsg(chatMsgs, user._id)

    return (
      <List style={{marginTop: 50, marginBottom:56}}>
        <QueueAnim type={['alpha', 'top']}>
          {
            lastMsgs.map(msg => {
              const targetId = (msg.to === user._id ? msg.from : msg.to)
              const targetUser = users[targetId]
              return (
                <Item key={msg._id}
                      thumb={targetUser.header ? require(`../../assets/headers/${targetUser.header}.png`).default : null}
                      extra={<Badge text={msg.unreadCount}/>}
                      arrow='horizontal'
                      onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                >
                  {targetUser.username}
                  <Brief>{msg.content}</Brief>
                </Item>
              )
            })
          }
        </QueueAnim>
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)
