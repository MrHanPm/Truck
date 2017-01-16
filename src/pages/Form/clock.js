import React, { Component } from 'react'
// import { Link } from 'react-router'
import handleChange from '../../utils/handleChange'
import { Alert, Tool, AllMsgToast } from '../../utils/tool'
import Navbar from '../Navbar/yesNo'
import XHR from '../../services/service'
import { dataTimeFormatter } from '../../utils/dateTimeFormatter'

export default class TruckList extends Component {
  constructor (props) {
    super(props)
    this.state = {
        'salesroom_id': props.params.roomId,
        'truck_id': props.params.truId ? props.params.truId : 0,
         mode: 'sms',
         mobile: '',
         start_difference: 0,
         end_difference: 0,
         ALARMCLOCK: {}
    }
    this.crtClick = this.crtClick.bind(this)
    this.handleChange = handleChange.bind(this)
    this.radios = this.radios.bind(this)
  }
  componentWillMount () {
    let usfo = JSON.parse(Tool.localItem('USERINFO'))
    let ALARMCLOCK = JSON.parse(Tool.localItem('ALARMCLOCK'))
    this.setState({
        mobile: usfo.mobile,
        ALARMCLOCK: ALARMCLOCK
    })
  }
  componentDidMount() {

  }
  checkForm () {
    let txt = this.state.mobile
    if (this.state.end_difference === 0 && this.state.start_difference === 0) {
        Alert.to('请选择提醒时间')
        return false
    }
    if (txt.length === 0 || txt == '') {
        Alert.to('请输入手机号')
        return false
    }
    if (/^1[3|4|5|7|8]\d{9}$/.test(txt)) {

    } else {
        Alert.to('请输入正确手机号')
        return false
    }
    return true
  }
  radios (e) {
    let nub = e.target.value
    let { ALARMCLOCK } = this.state
    // console.log(this.state.ALARMCLOCK)
    let Nows = new Date()
    Nows.setMonth(Nows.getMonth()-5)
    let Eows = new Date()
    Eows.setMonth(Eows.getMonth()-30)
    let Eow = Eows
    let Nt = dataTimeFormatter(Nows)
    let NEt = dataTimeFormatter(Eow)
    let St = dataTimeFormatter(ALARMCLOCK.ST)
    let Et = dataTimeFormatter(ALARMCLOCK.Et)

    if (e.target.value > 300) {
         if( Nt < St ) {
            this.refs.fivs.disabled = false
            if(e.target.checked){
                this.setState({
                    end_difference: e.target.value
                })
            } else {
                this.setState({
                    end_difference: 0
                })
            }
        } else {
            this.refs.fivs.checked = false
            this.refs.fivs.disabled = true
            Alert.to('开拍前已经超过5分钟')
            return false
        }
    } else {
        if( Et > NEt ) {
             this.refs.overs.disabled = false
            if(e.target.checked){
                this.setState({
                    start_difference: e.target.value
                })
            } else {
                this.setState({
                    start_difference: 0
                })
            }
        } else {
            this.refs.overs.checked = false
            this.refs.overs.disabled = true
            Alert.to('结束前已经超过30分钟')
            return false
        }
    }
  }
  crtClick () {
    if (this.checkForm()) {
        let db = this.state
        // console.log(db)
        XHR.myRemCrt(db)
        .then((db) => {
            if (!db) return
            let res = JSON.parse(db)
            if (res.status === 1) {
                alert(res.data.error_msg)
                let url = window.location.href
        window.location.href = `http://2b.360che.com/m/logging.php?action=login&referer=${url}`
                return
            }
            AllMsgToast.to('设置成功')
            window.history.back()
        })
    }
  }
  render () {
    return (
    <div style={{height: '100%'}}>
        <div className="boxPb">
            <div className="warn">
                <header>提醒时间</header>
                <ul>
                    <li>
                        <label For="s11">
                            <i>开拍前5分钟提醒</i>
                            <input type="checkbox" className="weui-check" id="s11" value="300" onChange={this.radios} ref="fivs"/>
                            <span className="choice"></span>
                        </label>
                    </li>
                    <li>
                        <label For="s12">
                            <i>结束前30分钟提醒</i>
                            <input type="checkbox" className="weui-check" id="s12" value="1800" onChange={this.radios} ref="overs" />
                            <span className="choice"></span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className="way">
                <header>提醒方式</header>
                <ul>
                    <li>
                        手机短信提醒
                        <a href="javascript:;" className="install" style={{display: 'none'}}>设置</a>
                        <input type="tel" className="Phone" name="mobile" value={this.state.mobile}
                                maxLength="11" placeholder="请输入您的手机号" 
                                onChange={this.handleChange}/>
                    </li>
                    <li style={{display: 'none'}}>
                        <label For="s13">
                            微信提醒
                            <input type="checkbox" name="checkbox2" className="weui-check" id="s13" />
                            <span className="choice"></span>
                        </label>
                    </li>
                </ul>
            </div>
            <footer><p>已设置的提醒可在“我的拍卖-我的提醒”中找到</p></footer>
        </div>
        <Navbar className="FotSty"
                addClock={this.crtClick}/>
    </div>
    )
  }
}
