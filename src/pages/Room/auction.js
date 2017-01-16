import React, { Component } from 'react'
import { Link } from 'react-router'
import Navbar from '../Navbar/index'
import { dataTimeFormatter} from '../../utils/dateTimeFormatter'
import { Tool, AllMsgToast } from '../../utils/tool'
import { LoadBox } from '../../views/more'
import XHR from '../../services/service'

export default class Welcomes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowCF: false,
      DELID:0,
      DELINX:0,
      isData: true,
      myBids: [],
      myWins: [],
      myDepos: [],
      myReminds: []
    }
    this.delREM = this.delREM.bind(this)
    this.potDEL = this.potDEL.bind(this)
    this.hideCF = this.hideCF.bind(this)
  }
  componentWillMount () {
    let sessionId = Tool.localItem('sessionId')
    XHR.myBid(1)
    .then((db) => {
      if (!db) return
      let res = JSON.parse(db)
      if (res.status === 1) { 
        alert(res.data.error_msg)
        let url = window.location.href
        window.location.href = `http://2b.360che.com/m/logging.php?action=login&referer=${url}`
        return
      }
      this.setState({myBids: res.data})
    })
    XHR.myWin(1)
    .then((db) => {
      if (!db) return
      let res = JSON.parse(db)
      if (res.status === 1) { 
        alert(res.data.error_msg)
        let url = window.location.href
        window.location.href = `http://2b.360che.com/m/logging.php?action=login&referer=${url}`
        return
      }
      this.setState({myWins: res.data})
    })
    XHR.myDep(1)
    .then((db) => {
      if (!db) return
      let res = JSON.parse(db)
      if (res.status === 1) { 
        alert(res.data.error_msg)
        let url = window.location.href
        window.location.href = `http://2b.360che.com/m/logging.php?action=login&referer=${url}`
        return
      }
      this.setState({myDepos: res.data})
    })
    XHR.myRem(1)
    .then((db) => {
      if (!db) return
      let res = JSON.parse(db)
      if (res.status === 1) { 
        alert(res.data.error_msg)
        let url = window.location.href
        window.location.href = `http://2b.360che.com/m/logging.php?action=login&referer=${url}`
        return
      }
      this.setState({myReminds: res.data,isData: false})
    })

  }
  componentWillUnmount () {
    
  }
  delREM(e) {
    console.log(4444444,e)
    this.setState({
      isShowCF: true,
      DELID: e.target.dataset.id,
      DELINX: parseInt(e.target.dataset.inx)
    })
  }
  hideCF(){
    this.setState({
      isShowCF: false
    })
  }
  potDEL(){
    let {DELID, DELINX, myReminds} = this.state
    if(DELID !== 0){
      XHR.delRem(DELID)
      .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        if (res.status === 1) { 
          alert(res.data.error_msg)
          let url = window.location.href
        window.location.href = `http://2b.360che.com/m/logging.php?action=login&referer=${url}`
          return
        }
        myReminds.splice(DELINX,1)
        this.setState({
          myReminds: myReminds,
          isShowCF: false
        })
        AllMsgToast.to('删除成功')
      })
    }
  }
  render () {
    let footer = null
    let {isShowCF, isData, myBids, myWins, myDepos, myReminds} = this.state
    if(isData){
        footer = <LoadBox />
    }
    return (
      <div style={{height: '100%'}}>
        <div className="BoxBt55">
          <h3>我的竞拍</h3>
          <p className="noMor" style={{display: myBids.length===0?'':'none'}}>～暂无数据～</p>
          <ul className="swiper" style={{display: myDepos.length===0?'none':''}}>
            {myBids.map((db,index) =>
            <li key={index}>
              <a href={`#truck/${db.salesroom_id}/${db.truck_id}`}>
                <figure>
                  <img src={`http://imgb.360che.com${db.src}`} alt="" />
                <figcaption>{db.fullname}</figcaption>
                </figure>
                <var className="underway"
                    style={{display: db.salesroom_status == 3 ? '' : 'none'}}>正在进行</var>
                <var className="begin" 
                    style={{display: db.salesroom_status == 2 ? '' : 'none'}}>即将开始</var>
                <var className="finish"
                    style={{display: db.salesroom_status == 4 ? '' : 'none'}}>已经结束</var>
                <var className="finish"
                    style={{display: db.salesroom_status == 5 ? '' : 'none'}}>已经结束</var>
              </a>
            </li>
            )}
          </ul>

          <h3>我的获拍</h3>
          <p className="noMor" style={{display: myWins.length === 0 ? '':'none'}}>～暂无数据～</p>
          <ul className="acquire-list" style={{display: myDepos.length === 0 ? 'none' : ''}}>
            {myWins.map((db,index) =>
            <li key={index}>
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
          <p className="noMor" style={{display: myDepos.length===0?'':'none'}}>～暂无数据～</p>
          <ul className="bail-list" style={{display: myDepos.length===0?'none':''}}>
            {myDepos.map((db,index) =>
            <li key={index}>
              <Link to={`/margindetails/${db.id}`}>
                <figure><img src={`http://imgb.360che.com${db.src}`} alt="" /></figure>
                <figcaption>{db.fullname}</figcaption>
                <span className="span">支付时间: {dataTimeFormatter(db.pay_date * 1000, 11)}</span>
                <div className="bail">
                  <span>保证金: <em>{db.amount}元</em></span>
                  <i className="freeze" style={{display: db.pay_status == '1' ? '' : 'none'}}>未付款</i>
                  <i className="freeze" style={{display: db.pay_status == '2' ? '' : 'none'}}>冻结中</i>
                  <i className="restoration" style={{display: db.pay_status == '4' ? '' : 'none'}}>已返还</i>
                  <i className="deduct" style={{display: db.pay_status == '3' ? '' : 'none'}}>已扣除</i>
                </div>
                <var className="underway">正在进行</var>
                <var className="finish" style={{display: 'none'}}>已经结束</var>
              </Link>
            </li>
            )}
          </ul>

          <h3>我的提醒</h3>
          <p className="noMor" style={{display: myReminds.length===0?'':'none'}}>～暂无数据～</p>
          <ul className="remind-list" style={{display: myDepos.length === 0 ? 'none' : ''}}>
          {myReminds.map((db,index) =>
            <li key={index}>
              <Link to={`/truck/${db.salesroom_id}/${db.truck_id}`}>
              <figure><img src={`http://imgb.360che.com${db.cover}`} alt="" /></figure>
              <figcaption>{db.title}</figcaption>
              <span>开始时间: 2016年09月20日  14:00</span>
              <em>结束时间: 2016年09月21日  21:00</em>
              </Link>
              <i data-id={db.id} data-inx={index} onClick={this.delREM}>删除提醒</i>
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
        <Navbar style={{top: '-50px'}}/>
        {footer}
        <div id="iosDialog" style={{display: isShowCF ? '':'none'}}>
            <div className="weui-mask"></div>
            <div className="weui-dialog">
                <div className="weui-dialog__hd"><strong className="weui-dialog__title">确认删除提醒？</strong></div>
                <div className="weui-dialog__bd" style={{display: 'none'}}></div>
                <div className="weui-dialog__ft">
                    <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default" onClick={this.potDEL}>确认删除</a>
                    <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.hideCF}>暂不删除</a>
                </div>
            </div>
        </div>
      </div>
    )
  }
}


