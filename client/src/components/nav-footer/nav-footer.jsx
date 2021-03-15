import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {TabBar} from 'antd-mobile'

const Item = TabBar.Item

class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unreadCount: PropTypes.number.isRequired
  }
  render() {
    let {navList, unreadCount} = this.props
    navList = navList.filter(nav => !nav.hide)
    const path = this.props.location.pathname
    return (
      <TabBar>
        {
          navList.map(nav => (
            <Item
              title={nav.text}
              badge={nav.path==='/message' ? unreadCount : 0}
              key={nav.path}
              icon={{uri: require(`./images/${nav.icon}.png`).default}}
              selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`).default}}
              selected={nav.path === path}
              onPress={() => {this.props.history.replace(nav.path)}}
            />
          ))
        }
      </TabBar>
    )
  }
}
export default withRouter(NavFooter)
