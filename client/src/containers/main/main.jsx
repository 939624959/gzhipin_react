/* 主界面路由组件*/
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'
import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

class Main extends Component {
  componentDidMount() {
    const userId = Cookies.get('userId')
    const {_id} = this.props.user
    if (userId && !_id) {
      // console.log('发送请求');
      this.props.getUser()
    }
  }

  navList = [
    {
      path: '/laoban',
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神'
    },
    {
      path: '/dashen',
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板'
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal',
      component: Personal,
      title: '个人中心',
      icon: 'personal',
      text: '个人'
    },
  ]

  render() {
    const userId = Cookies.get('userId')
    if (!userId) {
      return <Redirect to='/login'/>
    }
    const {user, unreadCount} = this.props
    if (!user._id) {
      return null
    } else {
      let path = this.props.location.pathname
      if (path === '/') {
        path = getRedirectTo(user.type, user.headers)
        return <Redirect to={path}/>
      }
    }
    const {navList} = this
    const path = this.props.location.pathname
    const currentNav = navList.find(nav => nav.path === path)
    if (currentNav) {
      if (user.type === 'laoban') {
        navList[1].hide = true
      } else {
        navList[0].hide = true
      }
    }
    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav => <Route path={nav.path} component={nav.component} key={nav.path}/>)
          }
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
          <Route path='/chat/:userId' component={Chat}/>
        </Switch>
        {currentNav ? <NavFooter navList={navList} unreadCount={unreadCount}/> : null}
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user, unreadCount: state.chat.unreadCount}),
  {getUser}
)(Main)
