import React, { Component } from 'react'
import { dataTimeFormatter} from '../utils/dateTimeFormatter'
import { Tool } from '../utils/tool'
import { Link } from 'react-router'
import XHR from '../services/service'
import { LoadBox } from '../views/more'

export default class TruckList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isData: true,
            MDB: {}
        }
    }
    componentWillMount () {
        let { params: { bidId } } = this.props
        XHR.myWinMsg(bidId)
        .then((db) => {
          if (!db) return
          let res = JSON.parse(db)
            if(XHR.isAlert(res)) {
                this.setState({MDB: res.data,isData: false})
            }
        })
    }
  render () {
    let { isData,MDB } = this.state
    let footer = null
    let Lname = '无'
    if(isData){
        footer = <LoadBox />
    }
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
        default :
            Lname = null
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
                <var>{MDB.deposite}(交易完退还)</var>
            </li>
            <li>
                获拍时间
                <var>{MDB.create_at > 6 ? dataTimeFormatter(MDB.create_at * 1000, 7) : '- -'}</var>
            </li>
        </ul>
        <div className="business">
            <label>线下交易地址</label>
            <span className="area">{MDB.address}</span>
        </div>
        <h3>获拍车</h3>
        <ul className="get-list" style={{marginBottom: '150px'}}>
            <li>
                <Link to={`/truck/${MDB.salesroom_id}/${MDB.truck_id}`}>
                <figure><img src={`http://imgb.360che.com${MDB.cover}`} alt="" /></figure>
                <figcaption>{MDB.fullname}</figcaption>
                <em>{MDB.explain}</em>
                <div className="price">
                    <span>起拍价:<var>{MDB.init_price}</var>万</span>
                </div>
                </Link>
            </li>
        </ul>
      </div>
      {footer}
      <span className="go-back" onClick ={() => {window.history.back()}}>返回</span>
      </div>
    )
  }
}
