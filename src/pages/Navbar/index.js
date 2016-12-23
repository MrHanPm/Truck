import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'


export default class Navbar extends Component {

  render () {
    return (
      <div className={`home-foot ${this.props.className}`} style={this.props.style}>
        
        <IndexLink to='/' className="home" activeClassName="selected">拍卖首页</IndexLink>
        <a className="preview" style={{display: 'none'}}>拍卖预览</a>
        <Link to='/auction' className="mine" activeClassName="selected">我的拍卖</Link>
        
      </div>
    )
  }
}
// <span className="return" onClick ={() => {window.history.back()}}></span>

// <span className="menu"></span>
