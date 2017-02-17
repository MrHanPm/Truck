import React, { Component } from 'react'
import { Link } from 'react-router'

import Navbar from './Navbar/index'
import XHR from '../services/service'
import handleScroll from '../utils/handleScroll'
import { Loading, NoMor, NoData } from '../views/more'
import { dataTimeCountdown, isState } from '../utils/dateTimeFormatter'
import { Tool } from '../utils/tool'

export default class Welcomes extends Component {
  constructor(props){
    super(props)
    this.state = {
      isData: false,
      isLoading: true, // 加载动画
      iaLod: false,  // 是否加载
      nowPage: 1,

      DATA:[]
    }
    this.handleScroll = handleScroll.bind(this)
  }
  componentWillMount () {
    XHR.wxConfig()
    .then((db) => {
      if (!db) return
      let res = JSON.parse(db)
      Tool.localItem('WXCFG', JSON.stringify(res.data))
      // wx.config({
      //   debug:true,
      //   appId: res.data.appId,
      //   timestamp: res.data.timestamp,
      //   nonceStr: res.data.noncestr,
      //   signature: res.data.signature,
      //   jsApiList: [
      //       'hideOptionMenu',
      //       'showOptionMenu',
      //       'closeWindow',
      //       'onMenuShareAppMessage',
      //       'uploadImage',
      //       'chooseImage',
      //       'chooseWXPay'
      //   ]
      // })
    })

    let nowPage = 1
    XHR.getUsInfo()
      .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        // if(db.state)
        if(XHR.isAlert(res)) {
          Tool.localItem('USERINFO', JSON.stringify(res.data))
        }
      })

    XHR.getToday(1)
      .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        if(XHR.isAlert(res)) {
          nowPage++
          if(res.data.length === 0){
            this.setState({isData: true})
          }else{
            this.setState({
              DATA: res.data,
              nowPage: nowPage,
              iaLod: res.data.length < 10 ? false : true,
              isLoading: res.data.length < 10 ? false : true
            })
          }
        }
      })
  }
  upDATA () {
    let { nowPage, iaLod, isData, isLoading, DATA } = this.state
    // console.log(roomId, nowPage, iaLod)
    if(iaLod) {
      this.setState({iaLod:false})
      XHR.getToday(nowPage)
      .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        if(XHR.isAlert(res)) {
          nowPage++
          DATA.push(...res.data)
          if(res.data.length < 10) {
            this.setState({
              DATA: DATA,
              isLoading: false
            })
          }else{
            this.setState({
              DATA: DATA,
              nowPage: nowPage,
              iaLod: true
            })
          }
        }
      })
    }
  }
  componentWillUnmount () {
    
  }
  render () {
    let footer = null
    let { DATA, isData, isLoading } = this.state
    if(isData){
        footer = <NoData />
    }else{
        footer = isLoading ? <Loading DATA={DATA.length>0?false:true}/> : <NoMor />
    }
    return (
      <div style={{height: '100%'}}>
        <div className="boxPb" data-pb="0" onScroll={this.handleScroll}>
          <ul className="auction-pic-list">
          { DATA.map((db, index) =>
            <li key={index}>
            <Link to={`/room/${db.id}`}>
              <figure><img src={`http://imgb.360che.com${db.cover}`} alt="" /></figure>
              <span className="content">
                <div className="time" id={`Cod${db.id}`}>
                  {dataTimeCountdown(db.begin_date * 1000, db.finish_date * 1000, db.id, db.status)}
                </div>
                <h2>{ db.name }</h2>
                <var>共{ db.trucks }辆车</var>
              </span>
              <var className="underway" id={`Und${db.id}`}
                style={{display: isState(db.status) == 'underway' ? '' : 'none'}}>正在进行</var>
              <var className="begin" 
                style={{display: isState(db.status) == 'begin' ? '' : 'none'}}>即将开始</var>
              <var className="finish" id={`Feg${db.id}`}
                style={{display: isState(db.status) == 'finish' ? '' : 'none'}}>已经结束</var>
              <em className="collect" style={{display: 'none'}}>已收藏</em>
              </ Link>
            </li>
          )}
          </ul>
          { footer }
        </div>
        <Navbar />
      </div>
    )
  }
}

