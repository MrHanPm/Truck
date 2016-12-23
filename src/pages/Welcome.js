import React, { Component } from 'react'
import { Link } from 'react-router'

import Navbar from './Navbar/index'
import XHR from '../services/service'
import { Loading, NoMor, NoData } from '../views/more'
import { dataTimeCountdown, isState } from '../utils/dateTimeFormatter'
import { Tool } from '../utils/tool'

export default class Welcomes extends Component {
  constructor(props){
    super(props)
    this.state = {
      isData: false,
      isLoading: true,
      DATA:[]
    }
    
  }
  componentWillMount () {
    let hase = window.location.pathname
    // console.log(hase,'hase',22222222)
    let sessionId
    if (hase.length > 6) {
      sessionId = hase.substring(1,hase.length)
    } else {
      sessionId = '84336cbcb894abee6c46e85d62fe18596b0eaa55'
    }
    Tool.localItem('SESSIONID', sessionId)
    
    XHR.getUsInfo()
      .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        // if(db.state)
        Tool.localItem('USERINFO', JSON.stringify(res.data))
      })

    XHR.getToday()
      .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        if(res.data.length === 0){
          this.setState({isData: true})
        }else{
          this.setState({
            DATA: res.data,
            isLoading: false
          })
        }
      })
  }
  render () {
    let footer = null
    let { DATA, isData, isLoading } = this.state
    if(isData){
        footer = <NoData />
    }else{
        footer = isLoading ? <Loading DATA={true}/> : <NoMor />
    }
    return (
      <div style={{height: '100%'}}>
        <div className="boxPb" data-pb="50" onScroll={this.handleScroll}>
          <ul className="auction-pic-list">
          { DATA.map((db, index) =>
            <li key={index}>
              <figure><img src={`http://imgb.360che.com${db.cover}`} alt="" /></figure>
              <Link className="content" to={`/room/${db.id}`}>
                <div className="time" id={`Cod${db.id}`}>
                  {dataTimeCountdown(db.begin_date * 1000, db.finish_date * 1000, db.id)}
                </div>
                <h2>{ db.name }</h2>
                <var>共{ db.trucks }辆车</var>
              </Link>
              <var className="underway" id={`Und${db.id}`}
                style={{display: isState(db.begin_date * 1000, db.finish_date * 1000) == 'underway' ? '' : 'none'}}>正在进行</var>
              <var className="begin" 
                style={{display: isState(db.begin_date * 1000, db.finish_date * 1000) == 'begin' ? '' : 'none'}}>即将开始</var>
              <var className="finish" id={`Feg${db.id}`}
                style={{display: isState(db.begin_date * 1000, db.finish_date * 1000) == 'finish' ? '' : 'none'}}>已经结束</var>
              <em className="collect" style={{display: 'none'}}>已收藏</em>
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

