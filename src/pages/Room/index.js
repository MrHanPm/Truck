import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tool } from '../../utils/tool'
import Heads from './Head'
import handleScroll from '../../utils/handleScroll'
import { Loading, NoMor, NoData, LoadBox} from '../../views/more'
import { dataTimeCountdown,typeIsCoun } from '../../utils/dateTimeFormatter'
import XHR from '../../services/service'

export default class TruckList extends Component {
  constructor (props) {
    super(props)
    this.state = {
        isData: false,
        isLoading: true, // 加载动画
        iaLod: false,  // 是否加载
        nowPage: 1,

        roomId:'',
        DATA:[],
        trucks: {}
    }
    this.handleScroll = handleScroll.bind(this)
  }
  componentWillMount () {
    let { params: { id } } = this.props
    let nowPage = this.state.nowPage
    XHR.getSrom(id,1)
      .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        nowPage++
        if(res.data.trucks.length === 0){
          this.setState({
            trucks: res.data.salesroom,
            roomId: id,
            isData: true
          })
        }else{
          this.setState({
            trucks: res.data.salesroom,
            DATA: res.data.trucks,
            roomId: id,
            nowPage: nowPage,
            iaLod: res.data.trucks.length < 10 ? false : true,
            isLoading: res.data.trucks.length < 10 ? false : true
          })
        }
      })
  }
  // componentDidMount() {}
  upDATA () {
    let {roomId, nowPage, iaLod, isData, isLoading, DATA } = this.state
    // console.log(roomId, nowPage, iaLod)
    if(iaLod) {
      this.setState({iaLod:false})
      XHR.getSrom(roomId, nowPage)
      .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        nowPage++
        DATA.push(...res.data.trucks)
        if(res.data.trucks.length < 10) {
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
      })
    }
  }
  render () {
    let footer = null
    let { trucks, DATA, isData, isLoading, roomId } = this.state
    if(isData){
        footer = <NoData />
    }else{
        footer = isLoading ? <Loading DATA={DATA.length>0?false:true}/> : <NoMor />
    }
    return (
      <div className="TrLiBox" data-pb="6" onScroll={this.handleScroll}>
        <Heads DATA={trucks}/>
        <div className="set-up">
          <div className="time" id={`Cod${trucks.id}`}>
            {dataTimeCountdown(trucks.begin_date * 1000, trucks.finish_date * 1000, trucks.id)}
          </div>
          <a href={`#clock/${roomId}`} className="remind"  style={{display: typeIsCoun(trucks.begin_date * 1000, trucks.finish_date * 1000) == '已结束'? 'none' : ''}}>设置提醒</a>
        </div>
        <ul className="car-list">
        { DATA.map((db, index) =>
          <li key={index}>
            <Link to={`/truck/${this.props.params.id}/${db.truck_id}`}>
            <figure>
              <img src={`http://imgb.360che.com${db.src}`} alt="" />
            </figure>
            <figcaption>{db.fullname}</figcaption>
            <em>{db.explain}</em>
            <em>出价{db.bid_count}次/{db.bid_persons}人竞拍</em>
            <div className="price">
              <span>评估价:{db.sale_price}万</span>
              <span>当前价:<var>{db.cur_price}</var>万</span>
            </div>
            </Link>
          </li>
        )}
        </ul>
        { footer }
        <div style={{display: DATA.length===0&& !isData ? '':'none'}}><LoadBox /></div>
      </div>
    )
  }
}
