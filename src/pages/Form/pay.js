import React, { Component } from 'react'
import handleChange from '../../utils/handleChange'
import { Alert, Tool } from '../../utils/tool'
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
        name: '',
        tel: '',
        'city_id': '',
        pay: '',
        protocol: 0,
        about: 0
    }
    this.handleChange = handleChange.bind(this)
    this.createPay = this.createPay.bind(this)
    this.SaveData = this.SaveData.bind(this)
    this.CheckForm = this.CheckForm.bind(this)
  }
  componentWillMount () {
    let { params: { amount } } = this.props
    let names = Tool.localItem('name')
    let hash = window.location.hash
    if (hash == '#1') {
        if (names === null) {
            this.setState({
                pay: amount,
                protocol: 1
            })
        } else {
            this.setState({
                pay: amount,
                name: names,
                protocol: 1
            })
        }
    } else {
        if (names === null) {
            this.setState({
                pay: amount
            })
        } else {
            this.setState({
                pay: amount,
                name: names
            })
        }
    }
  }
  componentDidMount() {

  }
  checkForm () {
    let nam = (this.state.name).replace(/\s+$|^\s+/g, '')
    let regHZ = /^[\u2E80-\u9FFF]+$/
    if (nam == '') {
        ErrMsg.to('姓名不能为空')
        return false
    }
    if (regHZ.test(nam)) {

    } else {
        ErrMsg.to('姓名必须是中文')
        return false
    }
    if (nam.length > 6) {
        ErrMsg.to('姓名过长')
        return false
    }
    if (this.state.city_id == '') {
        ErrMsg.to('地址不能为空')
        return false
    }
    if (this.state.protocol == 0) {
        ErrMsg.to('请同意竞拍服务协议')
        return false
    }
    if (this.state.about == 0) {
        ErrMsg.to('请同意保证金规则')
        return false
    }
    return true
  }
  createPay () {
    if (this.checkForm()) {
        let { params: { roomId, truId } } = this.props
        let sessionId = Tool.localItem('sessionId')
        payService
        .createPay(sessionId, roomId, truId, this.state.name, this.state.city_id)
        .then(msg => {
           return this.context.router.replace('/ok')
        })
    }
  }
  SaveData () {
    let pathname = window.location.pathname
    Tool.localItem('pathname', pathname)
    Tool.localItem('name', this.state.name)
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
    let { name, protocol, about } = this.state
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
                <li style={{display: 'none'}}>
                    <label>手机</label>
                    <input type="tel"
                        name="tel"
                        placeholder="请输入联系人手机"
                        value={this.state.tel}
                        maxLength="11"
                        onChange={this.handleChange} />
                </li>
                <li>
                    <label>所在地</label>
                    <input type="text" placeholder="请选择地点" />
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
                    <span className="agree-rule">同意<a href="/about">《保证金规则》</a></span>
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
