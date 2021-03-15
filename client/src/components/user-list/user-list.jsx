import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, Card, WhiteSpace} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body
class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render() {
    const {userList} = this.props
    return (
      <WingBlank style={{marginBottom:56, marginTop: 50}}>
        <QueueAnim type='scale'>
          {
            userList.map(user => (
              <div key={user._id}>
                <WhiteSpace/>
                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                  <Header thumb={user.header ? require(`../../assets/headers/${user.header}.png`).default : null}
                          extra={user.username}
                  />
                  <Body>
                    {user.post ? <div>职位: {user.post}</div> : null}
                    {user.company ? <div>公司: {user.company}</div> : null}
                    {user.salary ? <div>月薪: {user.salary}</div> : null}
                    {user.info ? <div>描述: {user.info}</div> : null}
                  </Body>
                </Card>
              </div>
            ))
          }
        </QueueAnim>
      </WingBlank>
    )
  }
}
export default withRouter(UserList)
