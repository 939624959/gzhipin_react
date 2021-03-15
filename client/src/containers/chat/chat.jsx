import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import {sendMsg, readMsg} from '../../redux/actions'
// import Icon from "antd-mobile/es/icon";

const Item = List.Item

class Chat extends Component {
  state = {
    content: '',
    isShow: false
  }
  componentWillMount() {
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊',
    '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😴',
    '😷', '🤮', '🤢', '🥵', '🤕', '😎', '😭', '😩', '😓', '😤', '😡', '😈', '☠️', '💩', '🤡',
    '👹', '👻', '👽', '😺', '😹', '💋', '👋', '🖖', '👌', '✌️', '🤟', '🤙', '👆', '👇', '👈',
    '👉', '🖕', '👍', '👎', '✊', '👊', '👏', '🙌', '🤝', '🙏', '✍️', '💪', '🦶', '👂', '👃',
    '🦷', '👀', '👄', '🧒', '👦', '👶', '👩', '👨', '🙋‍♀️', '🙋‍♂️', '☂️', '👓', '👕', '👗', '👜']
    this.emojis = emojis.map(emoji => ({text: emoji}))
  }
  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if (isShow) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentWillUnmount() {
    const from = this.props.match.params.userId
    const to = this.props.user._id
    const targetChatId = [from, to].sort().join('_')
    const {chatMsgs} = this.props.chat
    const targetMsgs = chatMsgs.filter(msg => (msg.chat_id === targetChatId && !msg.read))
    if (targetMsgs.length > 0) {
      this.props.readMsg(from, to)
    }
  }

  handleSend = () => {
    const from = this.props.user._id
    const to = this.props.match.params.userId
    const content = this.state.content.trim()
    if (content) {
      this.props.sendMsg({from, to, content})
    }
    this.setState({
      content: '',
      isShow: false
    })

  }

  render() {
    //得到数据
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    const meId = user._id
    if (!users[meId]) {
      return null
    }
    const targetId = this.props.match.params.userId
    const chatId = [meId, targetId].sort().join('_')
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
    const {username, header} = users[targetId]
    const targetIcon = header ? require(`../../assets/headers/${header}.png`).default : null
    return (
      <div id='chat-page'>
        <NavBar
          className='sticky-header'
          icon={<Icon type='left'/>}
          onLeftClick={()=>this.props.history.goBack()}
        >{username}</NavBar>
        <List style={{marginTop: 50, marginBottom: 56}}>
          <QueueAnim type='left' delay={100}>
            {
              msgs.map(msg => {
                if (targetId === msg.from) {
                  return (
                    <Item thumb={targetIcon} key={msg._id}>{msg.content}</Item>
                  )
                } else {
                  return (
                    <Item className='chat-me' extra='我' key={msg._id}>{msg.content}</Item>
                  )
                }
              })
            }
          </QueueAnim>
        </List>
        <div className='am-tab-bar'>
          <InputItem placeholder="请输入"
                     value={this.state.content}
                     onChange={val => this.setState({content: val})}
                     onFocus={()=>this.setState({isShow: false})}
                     extra={
                       <span>
                         <span onClick={this.toggleShow} style={{marginRight: 10}}>🙂</span>
                         <span onClick={this.handleSend}>发送</span>
                       </span>
                     }
          />
          {this.state.isShow ? (
            <Grid data={this.emojis}
                  columnNum={8}
                  carouselMaxRow={4}
                  isCarousel={true}
                  onClick={(item) => {
                    this.setState({content: this.state.content + item.text})
                  }}
            />
          ) :null}

        </div>
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)
