import React, { Component } from 'react'
// import { Link } from 'react-router'
import { Tool } from 'UTIL/errMsg'

import Navbar from 'COMPONENT/Navbar/comment'


export default class TruckList extends Component {
  constructor (props) {
    super(props)
    this.state = {
        MDB: []
    }
  }
  componentWillMount () {
    let { params: { roomId, truId } } = this.props
    let sessionId = Tool.localItem('sessionId')
    let json = {
        'action': 'tao',
        'method': 'comments',
        'salesroom_id': roomId,
        'truck_id': truId,
        'page': '',
        'items': '',
        'session_id': sessionId
    }
    this.props.getPosts(json)
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        MDB: nextProps.room.posts
    })
  }
  render () {
    let { params: { roomId, truId } } = this.props
    let { MDB, MDB: {posts} } = this.state
    return (
    <div style={{height: '100%'}}>
        <div className="TrLiBox">
            <div className="comment-head">
                <p>一汽解放 解放J6P牵引车</p>
                <div className="circum">
                    <span>车况很好(20)</span>
                    <span>保养的不错(20)</span>
                    <span>动力强劲(19)</span>
                    <span className="bad">外观有轻微损伤(20)</span>
                    <span className="bad">磨损严重(12)</span>
                    <span className="bad">有严重撞伤(2)</span>
                </div>
            </div>
            <ul className="posts-list">
                <li>
                    <div className="info">
                        <span className={posts.star >= 1 ? 'good current' : 'good'}></span>
                        <span className={posts.star >= 2 ? 'good current' : 'good'}></span>
                        <span className={posts.star >= 3 ? 'good current' : 'good'}></span>
                        <span className={posts.star >= 4 ? 'good current' : 'good'}></span>
                        <span className={posts.star >= 5 ? 'good current' : 'good'}></span>
                        <figure><img src="http://usr.im/32x32" alt="" /></figure>
                        <span className="user-wrap">{posts.author}</span>
                    </div>
                    <div className="content">
                        <p>{MDB.posts.message}</p>
                    </div>
                    <footer>
                        <span className="time">17分钟前</span>
                        <i className="reply">回复</i>
                    </footer>
                    <div className="comment-mess">
                    </div>
                </li>
            </ul>
        </div>
        <Navbar style={{top: '-60px'}}
                roomId={roomId}
                truId={truId} />
    </div>
    )
  }
}
