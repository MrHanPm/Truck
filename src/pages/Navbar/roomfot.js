import React, { Component } from 'react'
import { Link } from 'react-router'


export default class Navbar extends Component {
  render () {
    return (
      <div className={`detail-foot ${this.props.className}`} style={this.props.style}>
        <span className="return" onClick ={() => {window.history.back()}}></span>
        <div className="sign-up" style={{display: this.props.show ? '' : 'none'}} onClick={() => this.props.Pay()}>
          <h4>交保证金报名</h4>
          <em>保证金{this.props.numb}元，未排到全额退还</em>
        </div>
        <div className="sign-end" style={{display: this.props.show ? 'none' : ''}}>
          <h4>已经结束</h4>
        </div>
        <Link className="menu" to="/index"></Link>
      </div>
    )
  }
}
