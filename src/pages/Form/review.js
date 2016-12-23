import React, { Component } from 'react'
// import { Link } from 'react-router'
import { ErrMsg, Tool } from 'UTIL/errMsg'
// import store from 'STORE'
// import { connect } from 'react-redux'
import roomkService from 'SERVICE/roomService'
import Navbar from 'COMPONENT/Navbar/comment'
// import { injectReducer } from 'REDUCER'
// injectReducer('room', require('REDUCER/room/').default)

// @connect(
//   ({ room }) => ({ room }),
//   require('ACTION/room').default
// )

export default class TruckList extends Component {
  constructor (props) {
    super(props)
    this.state = {
        'salesroom_id': props.roomId,
        'truck_id': props.truId,
         action: 'tao',
         method: 'reply',
         star: 0,
         uid: 0,
         message: '',
         tags: 0,
         pid: '',
         attachment: '',
         'session_id': ''
    }
    this.onSave = this.onSave.bind(this)
    this.taGs = this.taGs.bind(this)
    this.Star = this.Star.bind(this)
    this.inputMessage = this.inputMessage.bind(this)
  }
  componentWillMount () {
    // console.log(store.getState())
    // let { params: { truckId } } = this.props
    // this.props.getImg(truckId)
    let usD = JSON.parse(Tool.localItem('userData'))
    // console.log(usD, 'usD')
    this.setState({
      uid: usD.uid
    })
  }
  componentDidMount() {
    let sessionId = Tool.localItem('sessionId')
    this.setState({'session_id': sessionId})
  }
  checkForm () {
    
    if (this.state.uid === 0) {
        ErrMsg.to('用户id是空的')
        return false
    }
    return true
  }
  onSave () {
    if (this.checkForm()) {
        let db = this.state
        roomkService
        .addPosts(db)
        .then(msg => {
          
        })
    }
  }
  taGs (e) {
    this.setState({
        tags: e.target.title
    })
  }
  Star (e) {
    this.setState({
        star: e.target.title
    })
  }
  inputMessage (e) {
    this.setState({
        message: e.target.value
    })
  }
  render () {
    let {message, tags, star} = this.state
    return (
    <div style={{height: '100%'}}>
        <div className="BoxBt55">
            <div className="review-head">
                <p>一汽解放 解放J6P牵引车</p>
                <div className="keep">
                    <span title="1" className={tags == '1' ? 'select' : ''} onClick={this.taGs}>车况很好</span>
                    <span title="2" className={tags == '2' ? 'select' : ''} onClick={this.taGs}>保养的不错</span>
                    <span title="3" className={tags == '3' ? 'select' : ''} onClick={this.taGs}>动力强劲</span>
                    <span title="4" className={tags == '4' ? 'select' : ''} onClick={this.taGs}>外观有轻微损伤</span>
                    <span title="6" className={tags == '6' ? 'select' : ''} onClick={this.taGs}>磨损严重</span>
                    <span title="5" className={tags == '5' ? 'select' : ''} onClick={this.taGs}>有严重撞伤</span>
                </div>
            </div>
            <div className="write">
                <textarea className="weui-textarea" placeholder="写点什么..." rows="3" value={message} onInput={this.inputMessage}></textarea>
                <div className="uploader-files">
                    <ul className="uploader">
                        <li>
                            <img src="http://usr.im/80x80" alt="" />
                            <i className="icon" style={{display: 'none'}}></i>
                            <i className="progress" style={{display: 'none'}}>50%</i>
                        </li>
                    </ul>
                    <div className="add-box">
                        <span className="add-pic">
                          <form enctype="multipart/form-data" method="post" name="imgFile">
                            <input type="file" accept="image/png,image/gif,image/jpeg" />
                          </form>
                        </span>
                    </div>
                </div>
            </div>
            <div className="entiretyspan">
                <em>总体评价</em>
                <span title="5" className={star >= 5 ? 'select' : ''} onClick={this.Star}></span>
                <span title="4" className={star >= 4 ? 'select' : ''} onClick={this.Star}></span>
                <span title="3" className={star >= 3 ? 'select' : ''} onClick={this.Star}></span>
                <span title="2" className={star >= 2 ? 'select' : ''} onClick={this.Star}></span>
                <span title="1" className={star >= 1 ? 'select' : ''} onClick={this.Star}></span>
            </div>
        </div>
        <Navbar style={{top: '-60px'}} text="发表评论" 
                onSave={this.onSave}/>
    </div>
    )
  }
}
