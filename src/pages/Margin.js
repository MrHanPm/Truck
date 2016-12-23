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
    let { params: { bidId } } = this.props
    this.props.ismyWinsMsg(sessionId, bidId)
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        MDB: nextProps.myMsg.winsMsg
    })
  }
  render () {
    let { MDB } = this.state
    let Lname = '无'
     switch (MDB.order_status) {
        case '1' :
            Lname = '未处理'
            break
        case '2' :
            Lname = '已完成'
            break
        case '3' :
            Lname = '已取消'
            break
     }
    return (
    <div style={{height: '100%'}}>
      <div className="TrLiBox">
        <div className="information">
            <p>您在获拍后10天内完成线下交易，逾期未完成将视为违约，您的获拍资格将被取消，本次参拍的保证金将被扣除。</p>
        </div>
        <ul className="order-list">
            <li>
                订单状态
                <var>{Lname}</var>
            </li>
            <li>
                最终成交价
                <i>万</i>
                <var>{MDB.amount}</var>
            </li>
            <li>
                保证金金额
                <var>{MDB.init_price}(交易完退还)</var>
            </li>
            <li>
                获拍时间
                <var>{dataTimeFormatter(MDB.create_at * 1000, 7)}</var>
            </li>
        </ul>
        <div className="business">
            <label>线下交易地址</label>   
            <span className="area">{MDB.address}</span>
        </div>
        <h3>获拍车</h3>
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
