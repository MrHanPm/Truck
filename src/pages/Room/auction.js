import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from 'COMPONENT/Navbar/'
import { dataTimeFormatter} from 'UTIL/dateTimeFormatter'
import { Link } from 'react-router'
import { Tool } from 'UTIL/errMsg'
// import { LoadBox } from 'VIEW/more'
import { injectReducer } from 'REDUCER'

injectReducer('myMsg', require('REDUCER/mi/').default)
@connect(
  ({ myMsg }) => ({ myMsg }),
  require('ACTION/mi/').default
)
export default class Welcomes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myBids: [],
      myWins: [],
      myDepos: [],
      myReminds: []
    }
  }
  componentWillMount () {
    let sessionId = Tool.localItem('sessionId')
    this.props.ismyBids(sessionId)
    this.props.ismyWins(sessionId)
    this.props.ismyDepos(sessionId)
    this.props.ismyReminds(sessionId)
  }
  componentWillUnmount () {
    
  }
  componentWillReceiveProps(nextProps) {
      this.setState({ 
        myBids: nextProps.myMsg.myBids,
        myWins: nextProps.myMsg.myWins,
        myDepos: nextProps.myMsg.myDepos,
        myReminds: nextProps.myMsg.myReminds
      })
  }
  render () {
    let {myBids, myWins, myDepos, myReminds} = this.state
    return (
      <div style={{height: '100%'}}>
        <div className="BoxBt55">
          <h3>我的竞拍</h3>
          <ul className="swiper">
            {myBids.map(db =>
            <li>
              <a href={`/truck/${db.salesroom_id}/${db.truck_id}`}>
                <figure>
                  <img src={`http://imgb.360che.com${db.src}`} alt="" />
                <figcaption>{db.fullname}</figcaption>
                </figure>
                <var className="underway"
                    style={{display: db.status == 3 ? '' : 'none'}}>正在进行</var>
                <var className="begin" 
                    style={{display: db.status == 2 ? '' : 'none'}}>即将开始</var>
                <var className="finish"
                    style={{display: db.status == 4 ? '' : 'none'}}>已经结束</var>
              </a>
            </li>
            )}
          </ul>

          <h3>我的获拍</h3>
          <ul className="acquire-list">
            {myWins.map(db =>
            <li>
              <Link to={`/margin/${db.bid_id}`}>
              <figure>
                <img src={`http://imgb.360che.com${db.src}`} alt="" />
              </figure>
              <figcaption>{db.fullname}</figcaption>
              <span>成交价: <em>{db.mount}万</em></span>
              <span>{dataTimeFormatter(db.create_at * 1000, 11)}</span>
              </Link>
            </li>
            )}
          </ul>

          <h3>我的保证金</h3>
          <ul className="bail-list">
            {myDepos.map(db =>
            <li>
              <Link to={`/marginDetails/${db.order_id}`}>
              <figure><img src={`http://imgb.360che.com${db.src}`} alt="" /></figure>
              <figcaption>{db.fullname}</figcaption>
              <span>支付时间: {dataTimeFormatter(db.pay_date * 1000, 11)}</span>
              <div className="bail">
                <span>保证金: <em>{db.amount}元</em></span>
                <i className="freeze" style={{display: db.pay_status == 2 ? '' : 'none'}}>冻结中</i>
                <i className="restoration" style={{display: db.pay_status == 4 ? '' : 'none'}}>已返还</i>
                <i className="deduct" style={{display: db.pay_status == 3 ? '' : 'none'}}>已扣除</i>
              </div>
              <var className="underway">正在进行</var>
              <var className="finish" style={{display: 'none'}}>已经结束</var>
              </Link>
            </li>
            )}
          </ul>

          <h3>我的提醒</h3>
          <ul className="remind-list">
          {myReminds.map(db =>
            <li>
              <figure><img src={`http://imgb.360che.com${db.cover}`} alt="" /></figure>
              <figcaption>{db.title}</figcaption>
              <span>支付时间: 2016年09月20日  14:00</span>
              <em>结束时间: 2016年09月21日  21:00</em>
              <i>删除提醒</i>
              <var className="underway"
                    style={{display: db.salesroom_status == 3 ? '' : 'none'}}>正在进行</var>
                <var className="begin" 
                    style={{display: db.salesroom_status == 2 ? '' : 'none'}}>即将开始</var>
                <var className="finish"
                    style={{display: db.salesroom_status == 4 ? '' : 'none'}}>已经结束</var>
            </li>
            )}
          </ul>
        </div>
        <Navbar style={{top: '-60px'}}/>
      </div>
    )
  }
}

