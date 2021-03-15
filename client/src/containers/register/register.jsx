/* 注册路由组件*/
import React, {Component} from 'react'
import {NavBar, InputItem, WingBlank, WhiteSpace, List, Button, Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
// import {Toast} from 'antd-mobile'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'
const ListItem = List.Item

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'dashen'
  }

  //处理输入数据改变的函数
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  //点击注册，收集信息
  register = () => {
    // console.log(this.state)
    this.props.register(this.state)
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const {type} = this.state
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
            <InputItem placeholder='请输入确认密码' type='password' onChange={value => this.handleChange('password2', value)}>确认密码:</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户类型:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)
