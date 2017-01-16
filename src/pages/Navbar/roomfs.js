import React, { Component } from 'react'
import { Link } from 'react-router'


export default class Navbar extends Component {
  render () {
    return (
      <div className={`detail-foot ${this.props.className}`} style={this.props.style}>
        <span className="return" onClick ={() => {window.history.back()}}></span>
        <Link to={`/pay/${this.props.roomId}/${this.props.truId}/${this.props.nub}`} className="sign-up" style={{display: this.props.show ? 'block' : 'none'}}>
          <h4>交保证金报名</h4>
          <em>保证金{this.props.numb}元，未拍到全额退还</em>
        </Link>
        <div className="sign-end" style={{display: this.props.show ? 'none' : ''}}>
          <h4>已经结束</h4>
        </div>
        <Link className="menu" to="/index" style={{display: 'none'}}></Link>
      </div>
    )
  }
}
