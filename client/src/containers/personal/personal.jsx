import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, List, Result, Button, WhiteSpace} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
class Personal extends Component {
  logout = () => {
    Modal.alert('退出', '确定退出登陆吗？',[
      {
        text: '取消'
      },
      {
        text: '确定',
        onPress: () => {
          Cookies.remove('userId')
          this.props.resetUser()
        }
      }
    ])
  }

  render() {
    const {username, header, company, salary, info, post, type} = this.props.user

    return (
      <div style={{marginBottom:56, marginTop: 50}}>
        <Result img={<img src={require(`../../assets/headers/${header}.png`).default} alt=""/>}
                title={username}
                message={company}
        />
        <WhiteSpace/>
        {
            type === 'laoban' ? (
            <List renderHeader={() => '相关信息'}>
              <Item multipleLine>
                {post ? <Brief>招聘职位: {post}</Brief> :null}
                {info ? <Brief>职位要求: {info}</Brief> :null}
                {salary ? <Brief>薪资: {salary}</Brief> : null}
              </Item>
            </List>
          ) : (
              <List renderHeader={() => '相关信息'}>
                <Item multipleLine>
                  {post ? <Brief>求职岗位: {post}</Brief> : null}
                  {info ? <Brief>个人介绍: {info}</Brief> : null}
                  {salary ? <Brief>期望薪资: {salary}</Brief> : null}
                </Item>
              </List>
            )
        }
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <Button type='warning' onClick={this.logout}>
          退出登陆
        </Button>
      </div>
    )


  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)
