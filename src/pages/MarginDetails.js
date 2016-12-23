import React, { Component } from 'react'
// import { Link } from 'react-router'
import { dataTimeFormatter} from 'UTIL/dateTimeFormatter'
import { Tool } from 'UTIL/errMsg'



export default class TruckList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            MDB: {}
        }
    }
  componentWillMount () {
    let sessionId = Tool.localItem('sessionId')
    let { params: { depositeId } } = this.props
    this.props.ismyDeposMsg(sessionId, depositeId)
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        MDB: nextProps.myMsg.deposMsg
    })
  }
  render () {
    let { MDB } = this.state
    let Lname = '无'
     switch (MDB.order_status) {
        case '1' :
            Lname = '未付款'
            break
        case '2' :
            Lname = '已付款'
            break
        case '3' :
            Lname = '已扣除'
            break
        case '4' :
            Lname = '已退还'
            break
     }
    return (
    <div style={{height: '100%'}}>
      <div className="TrLiBox">
        <div className="cash">
            <p>保证金将在拍卖结束后，竞拍失败或竞拍成功后完成线下交易1-3个工作日内还返，竞拍成功后10天内未完成线下交易将扣除保证金！ </p>
        </div>
        <ul className="cash-list">
            <li>
                保证金编号
                <var>{MDB.order_id}</var>
            </li>
            <li>
                保证金金额
                <var>{MDB.amount}元</var>
            </li>
            <li>
                保证金状态
                <var>{Lname}</var>
            </li>
            <li>
                支付方式
                <var>微信</var>
            </li>
            <li>
                支付时间
                <var>{dataTimeFormatter(MDB.pay_date * 1000, 7)}</var>
            </li>
            <li>
                返回时间
                <var>{dataTimeFormatter(MDB.refund_date * 1000, 7)}</var>
            </li>
        </ul>
        <h3>竞拍车</h3>
        <ul className="get-list">
            <li>
                <figure><img src={`http://imgb.360che.com${MDB.cover}`} alt="" /></figure>
                <figcaption>{MDB.fullname}</figcaption>
                <em>{MDB.explain}</em>
                <div className="price">
                    <span>起拍价:<var>{MDB.init_price}</var>万</span>
                </div>
            </li>
        </ul>
        </div>
        <span className="go-back" onClick ={() => {window.history.back()}}>返回</span>
      </div>
    )
  }
}
