import React, { Component } from 'react'
import XHR from '../services/service'
import { Tool } from '../utils/tool'
import { LoadBox } from '../views/more'


export default class Addres extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toastTimer:'',
      AZ: [],
      DATA: []
    }
    this.Citys = this.Citys.bind(this)
    this.Liclick = this.Liclick.bind(this)
  }
  componentWillMount () {
    XHR.getArea()
    .then((db) => {
      if (!db) return
      let res = JSON.parse(db)
      let AZ = []
      let DATA = []
      if (res.status === 1) { 
        alert('登录超时～')
        window.location.href = 'http://tao-yufabu.360che.com/member'
        return
      }
      for(let key in res.data){
        AZ.push(key)
        DATA.push([])
      }
      this.setState({
        AZ: AZ,
        DATA: res.data
      })
    })
  }
  componentDidMount() {
    let self = this.refs.rightAZ
    this.refs.rightAZ.addEventListener('touchstart', (e) => {}, false)
    this.refs.rightAZ.addEventListener('touchmove', (e) => {
            let y = e.changedTouches[0].pageY - self.getBoundingClientRect().top
            let ContHeight = self.getBoundingClientRect().height
            let target
            if(y > 0 && y < ContHeight){
              target = self.children[Math.round(y/20)]
            }
            try{
              let U = document.querySelector('.active')
              U.classList.remove('active')
            } catch (e){}
            target.classList.add('active')
            this.showScale(target.innerHTML)
      }, false)
      this.refs.rightAZ.addEventListener('touchend', (e) => {
        // e.preventDefault()
      }, false)
  }
  Citys(e) {
    Tool.localItem('CITYID', e.target.dataset.cityid)
    window.history.back()
  }
  Liclick(e){
    try{
      let U = document.querySelector('.active')
      U.classList.remove('active')
    } catch (e){}
    e.target.classList.add('active')
    this.showScale(e.target.innerHTML)
  }
  showScale(val){
      let self = this
      clearTimeout(this.state.toastTimer)
      this.UlScroll(val)
      self.refs.alertBox.innerHTML = val
      self.refs.alertBox.style.display='block'
      setTimeout(function(){
          self.refs.alertBox.classList.add('viewLixShow')
      },10)
      this.state.toastTimer = setTimeout(function(){
          self.refs.alertBox.classList.remove('show')
          self.refs.alertBox.style.display='none'
      },500)
  }
  UlScroll(el){
      var ulHeight = this.refs[el].parentNode.offsetTop
      this.refs.TrLiBox.scrollTop = ulHeight
  }
  render () {
    let { AZ, DATA } = this.state
    return (
      <div style={{height: '100%'}}>
        <div className="TrLiBox" ref="TrLiBox">
        { AZ.map((az, inx) =>
          <div className="adrListBox" key={inx}>
            <span className="title" ref={az}>{az}</span>
            <ul>
            { DATA[az].map((db, index) =>
              <li key={index} data-cityid={db.cityid} onClick={this.Citys}>{db.city}</li>
            )}
            </ul>
          </div>
        )}
        </div>
        <div className="rightAZ">
          <ul ref="rightAZ">
            {AZ.map((db, index) =>
            <li key={index} data-inx={index} onClick={this.Liclick}>{db}</li>
            )}
          </ul>
        </div>
        <div className="viewLix" ref="alertBox">L</div>
        <span className="go-back" onClick ={() => {window.history.back()}}>返回</span>
        <div style={{display: AZ.length===0 ? '':'none'}}><LoadBox /></div>
      </div>
    )
  }
}
