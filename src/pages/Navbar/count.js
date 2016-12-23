import React, { Component } from 'react'
import { Link } from 'react-router'


export default class Navbar extends Component {
  // static contextTypes = {
  //   router: React.PropTypes.object.isRequired
  // }
  // go () {
  //   this.context.router.replace('/pay')
  // }
  render () {
    return (
      <div className={`footer ${this.props.className}`} style={this.props.style}>
        <span className="return" onClick ={() => {window.history.back()}}></span>
        <span className="prix">
          <em className="plus" onClick={() => this.props.OnSale(0)}></em>
          <var> {this.props.pay} </var>
          <em className="reduce" onClick={() => this.props.OnSale(1)}></em>
        </span>
        <i className="bidding" onClick={() => this.props.goPay()}>出价</i>
        <Link className="menu" to="/index"></Link>
        <div className="countdown">
          <div className="Box">
            <span className="present">
              <p>当前价</p>
              <em>{this.props.nowPrice}</em>万
            </span>
            <div className="timer">
              <p>距离结束</p>
              <span>1天</span>
              <span>12时</span>
              <span>23分钟</span>
              <span>49秒</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
