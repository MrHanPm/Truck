import React, { Component } from 'react'
// import { Link } from 'react-router'


export default class Navbar extends Component {
  render () {
    return (
    <div className={`auction ${this.props.className}`} style={this.props.style}>
        <span>保证金: <var>{this.props.pay}元</var></span>
        <em className="pay" onClick={() => this.props.createPay()}>支付保证金</em>
    </div>
    )
  }
}
