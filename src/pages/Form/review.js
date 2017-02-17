import React, { Component } from 'react'
import { Tool, Alert, AllMsgToast } from '../../utils/tool'
import XHR from '../../services/service'
import Navbar from '../Navbar/comment'


export default class TruckList extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
        'salesroom_id': 0,
        'truck_id': 0,
         action: 'tao',
         method: 'reply',
         star: 0,
         uid: 0,
         message: '',
         tags: 0,
         attachment: '',
         pid: 0,

         isSave: true,
         imageList: [],  // 选择的图片
         msgVlue:[], // 提交图片值 attachment
         TruckNames:''
    }
    this.onSave = this.onSave.bind(this)
    this.taGs = this.taGs.bind(this)
    this.Star = this.Star.bind(this)
    this.inputMessage = this.inputMessage.bind(this)
    this.chooseImage = this.chooseImage.bind(this)
  }
  componentWillMount () {
    let { params: { roomId, truId, pid } } = this.props
    let USERINFO = JSON.parse(Tool.localItem('USERINFO'))
    let Names = Tool.localItem('TRUCK')
    this.setState({
      uid: USERINFO.uid,
      'salesroom_id': roomId,
      'truck_id': truId,
      pid: pid,
      TruckNames: Names
    })
  }
  componentDidMount() {

  }
  chooseImage () {
    let that = this
    let imageList = this.state.imageList
    let counts = 9 - imageList.length
    if(imageList.length < 9){
      wx.chooseImage({
        count: counts,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: function (res) {
          imageList.push(...res.localIds)
          that.uploadImg(res.localIds)
          imageList.splice(9,imageList.length - 9)
          // that.setState({
          //   imageList:imageList
          // })
        }
      })
    } else {
      this.refs.addPic.style.display = 'none'
    }
  }
  uploadImg (obj) {
    let that = this
    let msgVlue = this.state.msgVlue
    for(let src in obj){
      wx.uploadImage({
        localId: obj[src],
        isShowProgressTips: 1, 
        success: function (res) {
            // let txt = DB.data.src.substring(26,DB.data.src.length)
            // txt = txt.substring(0,txt.length-4)
            // console.log(DB.data.src,DB.data.src.length)
          msgVlue.push(res.serverId)
          that.setState({
            msgVlue: msgVlue
          })

          // console.log(res)
          // console.log(that.data.msgVlue)
        }
      })
    }
  }
  checkForm () {
    if (this.state.message.trim() == '') {
        Alert.to('评价内容不能为空')
        return false
    }
    if (this.state.star === 0) {
       Alert.to('请对车源总体评价打分')
       return false
    }
    return true
  }
  onSave () {
    if (this.checkForm()) {
      // this.setState({isSave: false})
      let { params: { roomId, truId } } = this.props
      let db = this.state
      db.attachment = this.state.msgVlue.join(',')
      XHR.addPosts(db)
      .then((dbs) => {
          if (!dbs) return
          let res = JSON.parse(dbs)
          if(XHR.isAlert(res)) {
            AllMsgToast.to('发表成功')
            // window.history.back()
            let urls = `/comment/${db.salesroom_id}/${db.truck_id}`
            this.context.router.replace(urls)
          }
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
    let {message, tags, star, imageList, TruckNames} = this.state
    return (
    <div style={{height: '100%'}}>
        <div className="BoxBt55">
            <div className="review-head">
                <p>{TruckNames}</p>
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
                        {imageList.map( (db,index) => 
                        <li key={index}>
                            <img src={db} alt="" />
                            <i className="icon" style={{display: 'none'}}></i>
                            <i className="progress" style={{display: 'none'}}>50%</i>
                        </li>
                        )}
                    </ul>
                    <div className="add-box">
                        <span className="add-pic" ref="addPic" onClick={this.chooseImage}></span>
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
        <Navbar text="发表评论" 
                onSave={this.onSave}/>
    </div>
    )
  }
}


// <form enctype="multipart/form-data" method="post" name="imgFile">
//   <input type="file" accept="image/png,image/gif,image/jpeg" />
// </form>
