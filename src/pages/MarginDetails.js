import React, { Component } from 'react'
import { Link } from 'react-router'
import { dataTimeFormatter} from '../utils/dateTimeFormatter'
import { Tool } from '../utils/tool'
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
    let { params: { depositeId } } = this.props
    XHR.myDepMsg(depositeId)
    .then((db) => {
      if (!db) return
      let res = JSON.parse(db)
      if (res.status === 1) {
        alert(res.data.error_msg)
        let url = window.location.href
        window.location.href = `http://2b.360che.com/m/logging.php?action=login&referer=${url}`
        return
      }
      this.setState({MDB: res.data,isData: false})
    })
  }
  componentDidMount() {

  }
  render () {
    let footer = null
    let Lname = '无'
    let {isData, MDB} = this.state
    if(isData){
        footer = <LoadBox />
    }
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
                    <var>{MDB.pay_date > 6 ? dataTimeFormatter(MDB.pay_date * 1000, 7): '- -'}</var>
                </li>
                <li>
                    返还时间
                    <var>{MDB.refund_date > 6 ? dataTimeFormatter(MDB.refund_date * 1000, 7) : '- -'}</var>
                </li>
            </ul>
            <h3>竞拍车</h3>
            <ul className="get-list">
                <li>
                    <Link to={`/truck/${MDB.salesroom_id}/${MDB.id}`}>
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
