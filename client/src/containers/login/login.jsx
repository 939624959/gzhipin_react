/* 注册路由组件*/
import React, {Component} from 'react'
import {NavBar, InputItem, WingBlank, WhiteSpace, List, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'

import Logo from '../../components/logo/logo'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  //处理输入数据改变的函数
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  //点击注册，收集信息
  login = () => {
    // console.log(this.state)
    this.props.login(this.state)
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {
    const {msg, redirectTo} = this.props.user
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null }
            <WhiteSpace/>
            <InputItem placeholder='请输入用户名' onChange={value => this.handleChange('username', value)}>用&nbsp; 户&nbsp;名:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入密码' type='password' onChange={value => this.handleChange('password', value)}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;陆</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)
