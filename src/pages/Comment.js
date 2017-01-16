import React, { Component } from 'react'

import { Tool, Alert } from '../utils/tool'
import { Loading, NoMor, NoData, LoadBox} from '../views/more'
import handleScroll from '../utils/handleScroll'
import Navbar from './Navbar/comment'
import { getTYP } from '../utils/posName'
import XHR from '../services/service'

export default class TruckList extends Component {
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

        TruckName: '',

        COMM:[],
        MDB: []
    }
    this.handleScroll = handleScroll.bind(this)
    this.goComm = this.goComm.bind(this)
  }
  componentWillMount () {
    let { params: { roomId, truId } } = this.props
    let Names = Tool.localItem('TRUCK')
    let json = {}
    json.salesroom_id = roomId
    json.truck_id = truId
    json.page = 1
    json.items = 20
    XHR.getPostsList (json)
    .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        if(res.data.posts.length === 0){
            this.setState({
                isData: true,
                TruckName: Names
            })
        } else {
            this.setState({
                TruckName: Names,
                COMM: res.data.posts,
                MDB: res.data.tags,
                nowPage: 2,
                iaLod: res.data.posts.length < 10 ? false : true,
                isLoading: res.data.posts.length < 10 ? false : true
            })
        }
    })
  }
  componentDidMount() {

  }
  goComm (e) {
    let { params: { roomId, truId } } = this.props
    let url = `/review/${roomId}/${truId}/${e.target.dataset.pid}`
    this.context.router.replace(url)
  }
  upDATA () {
    let { params: { roomId, truId } } = this.props
    let { nowPage, iaLod, isData, isLoading, COMM } = this.state
    let json = {}
        json.salesroom_id = roomId
        json.truck_id = truId
        json.page = nowPage
        json.items = 20
    if(iaLod) {
      this.setState({iaLod:false})
      XHR.getPostsList(json)
      .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        nowPage++
        COMM.push(...res.data.posts)
        if(res.data.posts.length < 20) {
          this.setState({
            COMM: COMM,
            isLoading: false
          })
        }else{
          this.setState({
            COMM: COMM,
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
    let { COMM, MDB, isData, isLoading, TruckName } = this.state
    if(isData){
        footer = <NoData />
    }else{
        footer = isLoading ? <Loading DATA={COMM.length>0?false:true}/> : <NoMor />
    }
    return (
    <div style={{height:'100%'}}>
        <div className="TrLiBox boxPb" data-pb="0" onScroll={this.handleScroll}>
            <div className="comment-head">
                <p>{TruckName}</p>
                <div className="circum">
                    { MDB.map((db,index) =>
                    <span className={index > 2 ? 'bad':''} key={index}>{getTYP(db.tag_id)}({db.total})</span>
                    )}
                </div>
            </div>
            <ul className="posts-list">
            { COMM.map((db,index) =>
                <li key={index}>
                    <div className="info">
                        <span className={db.star >= 5 ? 'good' : 'good current'}></span>
                        <span className={db.star >= 4 ? 'good' : 'good current'}></span>
                        <span className={db.star >= 3 ? 'good' : 'good current'}></span>
                        <span className={db.star >= 2 ? 'good' : 'good current'}></span>
                        <span className={db.star >= 1 ? 'good' : 'good current'}></span>
                        <figure><img src={db.avatar} alt="" /></figure>
                        <span className="user-wrap">{db.author}</span>
                    </div>
                    <div className="comment-mess" style={{display: db.quote.content?'':'none'}}>
                        <p className="com-xio">{db.quote.content}</p>
                    </div>
                    <div className="content">
                        <p>{db.message}</p>
                    </div>
                    <footer>
                        <span className="time">{db.dateline}</span>
                        <i className="reply" data-pid={db.pid} onClick={this.goComm}>回复</i>
                    </footer>
                </li>
                )}
            </ul>
            {footer}
        </div>
        <Navbar roomId={roomId}
                truId={truId} />
    </div>
    )
  }
}
