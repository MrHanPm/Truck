import React, { Component } from 'react'
import { Link } from 'react-router'
import { dataTimeCountdown} from '../../utils/dateTimeFormatter'

export default class Navbar extends Component {
  // static contextTypes = {
  //   router: React.PropTypes.object.isRequired
  // }
  // go () {
  //   this.context.router.replace('/pay')
  // }
  constructor (props) {
    super(props)
    this.upTimes = this.upTimes.bind(this)
  }
  upTimes (txt) {
    this.refs.Atim.innerHTML = txt
  }
  render () {
    return (
      <div className={`footer ${this.props.className}`} style={this.props.style}>
        <span className="return" onClick ={() => {window.history.back()}}></span>
        {dataTimeCountdown(this.props.begin, this.props.finish, 'null', this.props.status, this.upTimes )}
        <span className="prix">
          <em className="plusdspl"></em>
          <var> {this.props.pay} </var>
          <em className="reduceplace"></em>
        </span>
        <i className="bidding" style={{background: '#999'}}>出价</i>
        <Link className="menu" to="/index" style={{display: 'none'}}></Link>
        <div className="countdown">
          <div className="Box">
            <span className="present">
              <p>当前价</p>
              <em>{this.props.nowPrice}</em>万
            </span>
            <div className="timer">
              <p>距离结束</p>
              <span ref="Atim"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
