import React, { Component } from 'react'
import { dataTimeFormatter } from '../utils/dateTimeFormatter'
import { Tool, Alert } from '../utils/tool'
import XHR from '../services/service'
import handleScroll from '../utils/handleScroll'
import { Loading, NoMor, NoData, LoadBox} from '../views/more'

export default class BidREC extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      isData: false,
      isLoading: true, // 加载动画
      iaLod: false,  // 是否加载
      nowPage: 1,

      BID: []
    }
    this.handleScroll = handleScroll.bind(this)
  }
  componentWillMount () {
    let { params: { roomId, truId } } = this.props
    let USERINFO = JSON.parse(Tool.localItem('USERINFO'))
    let nowPage = this.state.nowPage
    XHR.getBids(roomId, truId,1)
    .then((db) => {
          if (!db) return
          let res = JSON.parse(db)
          nowPage++
          if (res.status === 1) {
            alert(res.data.error_msg)
            let url = window.location.href
        window.location.href = `http://2b.360che.com/m/logging.php?action=login&referer=${url}`
            return
          }
          if(res.data.length === 0){
            this.setState({
              isData: true
            })
          }else{
            this.setState({
              UID: USERINFO.uid,
              BID: res.data,
              nowPage: nowPage,
              iaLod: res.data.length < 20 ? false : true,
              isLoading: res.data.length < 20 ? false : true
            })
          }
      })
  }

  upDATA () {
    let { params: { roomId, truId } } = this.props
    let { nowPage, iaLod, isData, isLoading, BID } = this.state
    if(iaLod) {
      this.setState({iaLod:false})
      XHR.getBids(roomId, truId,nowPage)
      .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        nowPage++
        BID.push(...res.data)
        if(res.data.length < 20) {
          this.setState({
            BID: BID,
            isLoading: false
          })
        }else{
          this.setState({
            BID: BID,
            nowPage: nowPage,
            iaLod: true
          })
        }
      })
    }
  }

  render () {
    let { params: { roomId, truId } } = this.props
    let footer = null
    let { BID, UID, isData, isLoading} = this.state
    if(isData){
        footer = <NoData />
    }else{
        footer = isLoading ? <Loading DATA={BID.length>0?false:true}/> : <NoMor />
    }
    return (
      <div style={{height:'100%'}}>
        <div className="head Ding">
            <span>竞拍人</span>
            <span>出价金额</span>
            <span>时间</span>
        </div>
        <ul className="bid-list DinHead" data-pb="50" onScroll={this.handleScroll}>
            { BID.map((db,index) =>
            <li key={index}>
                <span>
                  <img src={db.member.avatar} alt="" />
                  <i className="myself" style={{display: db.uid == UID ? '':'none'}}>我</i>
                </span>
                
                <span>{db.amount}万</span>
                <span>{dataTimeFormatter(db.create_at * 1000, 10)}</span>
                <em className="eliminated" style={{display: db.out ? '' : 'none'}}>出局</em>
                <em className="ahead" style={{display: db.out ? 'none' : ''}}>领先</em>
            </li>
            )}
            <li style={{background:'none',display:'block'}}>{ footer }</li>
        </ul>
        <div style={{display: BID.length===0 && !isData ? '':'none'}}><LoadBox /></div>
        <span className="go-back" onClick ={() => {this.context.router.replace(`/truck/${roomId}/${truId}`)}}>返回</span>
      </div>
    )
  }
}
