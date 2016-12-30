import React, { Component } from 'react'
import handleChange from '../../utils/handleChange'
import { Alert, Tool, AllMsgToast } from '../../utils/tool'
// import { Link } from 'react-router'
import Navbar from '../Navbar/pay'
import XHR from '../../services/service'

export default class TruckList extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
        'salesroom_id':0,
        'truck_id':0,
        'city_id': 0,
        name: '',
        mobile: '',

        pay: '',
        truName:'',
        protocol: 0,
        about: 0
    }
    this.handleChange = handleChange.bind(this)
    this.goAddress = this.goAddress.bind(this)
    this.createPay = this.createPay.bind(this)
    this.SaveData = this.SaveData.bind(this)
    this.CheckForm = this.CheckForm.bind(this)

  }
  componentWillMount () {
    let { params: { roomId, truId, amount, yn } } = this.props
    let names = Tool.localItem('NAME')
    let CITYID = JSON.parse(Tool.localItem('CITYID'))
    let USERINFO = JSON.parse(Tool.localItem('USERINFO'))
    this.setState({
        name: names ? names : USERINFO.nickname,
        pay: amount,
        truName: CITYID ? CITYID.name : '',
        'salesroom_id':roomId,
        'truck_id':truId,
        'city_id': CITYID ? CITYID.val : '',
        protocol: yn ? 1 : 0,
        mobile: USERINFO.mobile
    })
  }
  componentDidMount() {

  }
  checkForm () {
    let nam = (this.state.name).replace(/\s+$|^\s+/g, '')
    // let regHZ = /^[\u2E80-\u9FFF]+$/
    if (nam == '') {
        Alert.to('姓名不能为空')
        return false
    }
    // if (regHZ.test(nam)) {

    // } else {
    //     Alert.to('姓名必须是中文')
    //     return false
    // }
    // if (nam.length > 6) {
    //     Alert.to('姓名过长')
    //     return false
    // }
    if(!Tool.checkPhone(this.state.mobile)){
        Alert.to('手机号不正确')
        return false
    }
    if (this.state.city_id === 0) {
        Alert.to('地址不能为空')
        return false
    }
    if (this.state.protocol === 0) {
        Alert.to('请同意竞拍服务协议')
        return false
    }
    if (this.state.about === 0) {
        Alert.to('请同意保证金规则')
        return false
    }
    return true
  }
  createPay () {
    let _this = this
    if (this.checkForm()) {
        let json = this.state
        XHR.cotPay(json)
        .then((db) => {
            if (!db) return
            let res = JSON.parse(db)
            let WXCFG = JSON.parse(localStorage.getItem('WXCFG'))
            if (res.status === 1) {
                alert(res.data)
                window.location.href = 'http://tao-yufabu.360che.com/member'
                return
            }
            XHR.goPay(res.data)
            // XHR.goPay(res.data, WXCFG.timestamp).then((db) => {
            //     if (!db) return
            //     let res = JSON.parse(db)
            //     wx.chooseWXPay({
            //         timestamp: res.data.pay.timeStamp,
            //         nonceStr: res.data.pay.nonceStr,
            //         package: res.data.pay.package,
            //         signType: res.data.pay.signType,
            //         paySign: res.data.pay.paySign,
            //         success: function (res) {
            //             _this.context.router.replace('/auction')
            //         }
            //     })
            // })
        })
    }
  }
  goAddress () {
    let pathname = window.location.hash
    Tool.localItem('URL', pathname)
    Tool.localItem('NAME', this.state.name)
    this.context.router.replace('/addres')
  }
  SaveData () {
    let pathname = window.location.hash
    let url = pathname
    // console.log(this.props.params.yn)
    if(this.props.params.yn){
        url = pathname.substring(0,pathname.indexOf('?')-2)
    }
    Tool.localItem('URL', url)
    Tool.localItem('NAME', this.state.name)
    return this.context.router.replace('/protocol')
  }
  CheckForm (e) {
    if (e.target.checked) {
        this.setState({
            [e.target.name]: 1
        })
    } else {
        this.setState({
            [e.target.name]: 0
        })
    }
  }
  render () {
    let { name, protocol, about, truName, mobile } = this.state
    return (
    <div style={{height: '100%'}}>
        <div className="BoxBt55">
            <ul className="sign-up-info">
                <li>
                    <label>姓名</label>
                    <input type="text"
                        name="name"
                        placeholder="请输入联系人姓名"
                        value={name}
                        maxLength="6"
                        onChange={this.handleChange} />
                </li>
                <li>
                    <label>手机</label>
                    <input type="tel"
                        name="mobile"
                        placeholder="请输入联系人手机"
                        value={mobile}
                        maxLength="11"
                        onChange={this.handleChange} />
                </li>
                <li onClick={this.goAddress}>
                    <label>所在地</label>
                    <input type="text" placeholder="请选择地点" value={truName} disabled="true" />
                </li>
            </ul>
            <div className="sign-up-pay">
                <em className="back-pic"></em>
                微信支付
                <span className="check-mark"></span>
            </div>
            <div className="sign-up-introduce">
                <p>1、未成功竞拍商品，保证金将全额退还；</p>
                <p>2、竞拍成功后，在竞拍规则规定时间内完成交易，保证金将全额退还</p>
            </div>
            <div className="agree">
                <div className="agreement-module">
                    <input type="checkbox" name="protocol" checked={protocol ? 'checked' : '' } onClick={this.CheckForm}/>
                    <span className="agreement">同意<a href="javascript:;" onClick={this.SaveData}>《用户竞拍服务协议》</a></span>
                </div>
                <div className="agree-module">
                    <input type="checkbox" name="about" checked={about ? 'checked' : '' } onClick={this.CheckForm} />
                    <span className="agree-rule">同意<a href="#about">《保证金规则》</a></span>
                </div>
            </div>
            <div className="sign-module">
                <em>咨询电话</em>
                <a href="tel:400-0000-0000" className="phone">400-0000-0000</a>
            </div>
        </div>
        <Navbar style={{top: '-60px'}}
                createPay={this.createPay}
                pay={this.state.pay}/>
    </div>
    )
  }
}
