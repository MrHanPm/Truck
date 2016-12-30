import React, { Component } from 'react'

import { dataTimeFormatter, dataTimeCountdown, isState, typeIsCoun} from '../../utils/dateTimeFormatter'
import Navbar from '../Navbar/count'
import NavbarPay from '../Navbar/roomfot'
import { Link } from 'react-router'
import { Tool, Alert } from '../../utils/tool'
import XHR from '../../services/service'
import { LoadBox } from '../../views/more'

import ImgPic from '../../assets/img/pic.png'
export default class TruckMsg extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
        isData:false,
        COMM:[],
        data: {
            salesroom: {},
            truck: {
                pictures: [],
                recondition: [],
                'on_sale': {},
                'other_salesroom': [],
                'other_trucks': []
            }
        },
        increase: 0,
        pay: 0,
        isRoom: true
    }
    this.OnSale = this.OnSale.bind(this)
    this.goPay = this.goPay.bind(this)
    this.MSG = this.MSG.bind(this)
    this.Pay = this.Pay.bind(this)
    this.selRoom = this.selRoom.bind(this)
    this.goToCom = this.goToCom.bind(this)
  }
  componentWillMount () {
    let { params: { roomId, truId } } = this.props
    let json = {}
    XHR.getMsg(roomId, truId)
    .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        this.setState({
            data: res.data,
            isData: true
        })
    })
    json.salesroom_id = roomId
    json.truck_id = truId
    json.page = 1
    json.items = 1
    XHR.getPostsList (json)
    .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        this.setState({
            COMM: res.data.posts
        })
    })
  }
  componentDidMount() {
    salesroom.begin_date
  }
  selRoom (e) {
    let val = e.target.title
    if (val == 1) {
        this.setState({
            isRoom: true
        })
    } else {
        this.setState({
            isRoom: false
        })
    }
  }
  MSG () {
    let json = {}
    json.paid_for_deposite = this.state.data.truck.paid_for_deposite
    json.status = this.state.data.truck.status
    json.deposite = this.state.data.truck.on_sale.deposite
    json.roomId = this.state.data.salesroom.id
    Tool.localItem('TRUCK', JSON.stringify(json))
  }
  goToCom(){
    Tool.localItem('TRUCK', this.state.data.truck.fullname)
  }
  OnSale (nu) {
    if (nu) {
        let newP = this.state.pay + this.state.increase
        this.setState({pay: newP})
    } else {
        let newP = this.state.pay - this.state.increase
        if (newP <= this.state.increase) {
            Alert.to('不能低于起拍价')
        } else {
            this.setState({pay: newP})
        }
    }
  }

  goPay () {
    let { params: { roomId, truId } } = this.props
    let url = `/bidRecord/${roomId}/${truId}`
    let json = {}
    json.salesroom_id = roomId
    json.truck_id = truId
    json.increase = this.state.pay
    XHR.potPay(json)
    .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        if (res.status === 1) {
            alert(res.data)
            // window.location.href = 'http://tao-yufabu.360che.com/member'
            return
        }
        this.context.router.replace(url)
    })
  }
  Pay () {
    let { params: { roomId, truId } } = this.props
    let nub = parseInt(this.state.data.truck.on_sale.deposite)
    let url = `/pay/${roomId}/${truId}/${nub}`
    this.context.router.replace(url)
  }
  componentWillReceiveProps(nextProps) {
    let { params: { roomId, truId } } = nextProps
    XHR.getMsg(roomId, truId)
    .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        this.setState({
            data: res.data,
            isData: true
        })
        this.refs.BoxBt55.scrollTop = 0
    })
  }
  render () {
    let { params: { roomId, truId } } = this.props
    let {COMM,isRoom,isData, data: {salesroom, truck, truck: { pictures, recondition }}} = this.state
    let Widths = window.screen.width
    let otherSalesroom = this.state.data.truck.other_salesroom
    let otherTrucks = this.state.data.truck.other_trucks
    let footBtn

    let TXT = typeIsCoun(salesroom.begin_date * 1000, salesroom.finish_date * 1000)

    if(TXT == '已结束'){
        footBtn = <NavbarPay show={false} />
    } else {
        footBtn = <NavbarPay show={true}
                                numb={truck.on_sale.deposite}
                                Pay={this.Pay}/>
    }
    if (truck.paid_for_deposite) {
        footBtn = <Navbar nowPrice={truck.current_price}
                    OnSale = {this.OnSale}
                    goPay = {this.goPay}
                    pay = {this.state.pay}/>
    }
    return (
    <div style={{height: '100%'}}>
        <div className="BoxBt55" ref="BoxBt55">
            <div className="diagram swiper-container clear-float" id="diagram">
                <div className="swiperBox">
                <ul className="swiper-wrapper" style={{width: `${Widths * pictures.length}px`}}>
                    { pictures.map((db, index) =>
                    <li className="swiper-slide" style={{width: `${Widths}px`}}>
                        <Link to={`/room/truck/${truck.id}`} onClick={this.MSG}>
                        <figure><img src={`http://imgb.360che.com${db.src}`} alt="" /></figure>
                        <span className="swiper-pagination">{`${index + 1}/${pictures.length}`}</span>
                        </Link>
                    </li>
                    )}
                </ul>
                </div>
                <var className="underway" id={`Und${salesroom.id}`}
                style={{display: isState(salesroom.begin_date * 1000, salesroom.finish_date * 1000) == 'underway' ? '' : 'none'}}>正在进行</var>
                <var className="begin" 
                style={{display: isState(salesroom.begin_date * 1000, salesroom.finish_date * 1000) == 'begin' ? '' : 'none'}}>即将开始</var>
                <var className="finish" id={`Feg${salesroom.id}`}
                style={{display: isState(salesroom.begin_date * 1000, salesroom.finish_date * 1000) == 'finish' ? '' : 'none'}}>已经结束</var>
                <span className="share"></span>
                <em className="location">{ truck.license_city }</em>
                <em className="enshrine" style={{display: 'none'}}>收藏</em>
            </div>
            <div className="introduce">
                <p>{truck.fullname}</p>
                <div className="car-price">
                    当前价
                    <em> {truck.current_price} </em><i>万元</i>
                    <span><var>{truck.on_sale.bid_persons}</var>人竞拍</span>
                </div>
                <div className="time" id={`Cod${salesroom.id}`}>
                    {dataTimeCountdown(salesroom.begin_date * 1000, salesroom.finish_date * 1000, salesroom.id)}
                </div>
                <a href={`#clock/${roomId}/${truId}`} className="remind" style={{display: typeIsCoun(salesroom.begin_date * 1000, salesroom.finish_date * 1000) == '已结束'? 'none' : ''}}>设置提醒</a>
            </div>
            <ul className="condition-list">
                <li>
                    <span>起拍价<i>{truck.on_sale.init_price}万</i></span>
                    <span>评估价<i>{truck.sale_price}万</i></span>
                    <span>保留价<i>{truck.on_sale.reserve_price > 0 ? '有':'无'}</i></span>
                </li>
                <li>
                    <span>加价幅度<i>{truck.on_sale.increase}元</i></span>
                    <span>延时周期<i>{truck.on_sale.interval}分钟/1次</i></span>
                    <span>拍卖佣金<i>{truck.on_sale.commission}元</i></span>
                </li>
            </ul>
            <div className="bidden ABlock">
                <Link to={`/bidRecord/${roomId}/${truId}`}>
                出价记录 ({truck.on_sale.bid_count})
                <span>我的出价 : <em>{truck.my_bid}</em> 万</span>
                </Link>
            </div>


            <div className="flow-path">
                <p>拍卖流程</p>
                <ul className="process-list">
                    <li>
                        <span>车</span>
                        <em>实地看车</em>
                        <i>1</i>
                    </li>
                    <li>
                    <span>交</span>
                    <em>交保证金报名</em>
                    <i>2</i>
                    </li>
                    <li>
                        <span>拍</span>
                        <em>出价竞拍</em>
                        <i>3</i>
                    </li>
                    <li>
                        <span>竞</span>
                        <em>竞拍成功</em>
                        <i>4</i>
                    </li>
                    <li>
                        <span>支</span>
                        <em>线下支付车款</em>
                        <i>5</i>
                    </li>
                    <li>
                        <span>办</span>
                        <em>办理过户手续</em>
                        <i>6</i>
                    </li>
                    <li>
                        <span>易</span>
                        <em>提车完成交易</em>
                        <i>7</i>
                    </li>
                </ul>
                <a href="#protocol/msg" className="deposit">保证金规则<em>未拍到全额退款</em></a>
                <a href="#about" className="regular">交易规则</a>
            </div>


            <a href={`#room/${salesroom.id}`} className="special">{salesroom.name}（{salesroom.trucks}）</a>


            <div className="car-configure">
                <h3>车辆配置<Link href={`#detail/${truck.model_id}`} className="examine">查看详情</Link></h3>
                <ul className="configure-list" style={{display:'none'}}>
                    <li>
                        <span>驱动形式<i>6X4</i></span>
                        <span>排放标准<i>国四</i></span>
                        <span>发动机<i>福田康明斯</i></span>
                    </li>
                    <li>
                        <span>马力<i>430马力</i></span>
                        <span>档位<i>16档</i></span>
                        <span>后桥速比<i>3.083</i></span>
                    </li>
                </ul>
            </div>

            
            <div className="place">
                <h3>看车地点</h3>
            </div>  
            <div className="locale">
                <span>{truck.license_city} {truck.address}</span>
            </div>

            <div className="situation-modul">
                <h3>易卡通说<a href={`tel:${truck.custom_service}`} className="consult">咨询车况</a></h3>
                <div className="situation">
                    <p>{truck.introduction}</p>
                </div>
            </div>


            <div className="comments">
                <h3>网友点评<a href={`#comment/${roomId}/${truId}`} className="examine" onClick={this.goToCom}>查看更多</a></h3>
                { COMM.map((db,index) =>
                <Link to={`/comment/${roomId}/${truId}`} onClick={this.goToCom}>
                    <div className="comments-list" key={index}>
                        <span className={db.star>='5'?'good':'good current'}></span>
                        <span className={db.star>='4'?'good':'good current'}></span>
                        <span className={db.star>='3'?'good':'good current'}></span>
                        <span className={db.star>='2'?'good':'good current'}></span>
                        <span className={db.star>='1'?'good':'good current'}></span>
                        <figure><img src={db.avatar} alt="" /></figure>
                        <h4 className="caption">{db.author}</h4>
                        <em className="date">{dataTimeFormatter(db.dateline>0?db.dateline *1000:0,6)}</em>
                    </div>
                    <div className="comments-msg">{db.message}</div>
                </Link>
                )}
                <a href={`#review/${roomId}/${truId}`} className="know" onClick={this.goToCom}>我看过车，我来点评</a>
            </div>

            <div className="same">
                <div className="title">
                    <span className="change">
                        <em className={isRoom ? 'selected' : 'other'} title="1" onClick={this.selRoom}>同场车辆</em>
                        <em className={isRoom ? 'other' : 'selected'} title="0" onClick={this.selRoom}>其他专场</em>
                    </span>
                </div>
                <ul className="car-list" style={{display: isRoom ? '' : 'none'}}>
                    { otherTrucks.map((db,index) =>
                    <li key={index}>
                        <Link to={`/truck/${roomId}/${db.truck_id}`}>
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
                
                <ul className="auction-pic-list" style={{display: isRoom ? 'none' : ''}}>
                  { otherSalesroom.map((db,index) =>
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

            </div>
        </div>
        {footBtn}
        <div style={{display: pictures.length===0&& !isData ? '':'none'}}><LoadBox /></div>
    </div>
    )
  }
}



// <div className="gauging" display={{display: 'none'}}>
//                 <h3>车辆检测报告<a href={`#report/${truId}`} className="examine" >查看详情</a></h3>
//                 <div className="post">
//                     <figure><img src={ImgPic} alt="" /></figure>
//                     <figcaption>评估师: {truck.recondition_operator}</figcaption>
//                     <em>易卡车高级评估车</em>
//                     <span className={truck.recondition_level}></span>
//                 </div>
//                 <i>共{truck.recondition_pass + truck.recondition_notpass}项检测, {truck.recondition_pass}项通过检测</i>
//                 <p className="critique">点评：{truck.recondition_report}</p>
//                 <ul className="capability-list">
//                     { recondition.map((db,index) =>
//                     <li key={index}>
//                         <a href="#">
//                             {db.position}
//                             <i style={{display: db.notpass > 0 ? '' : 'none'}}>{db.notpass}项
//                                 <span className="weui-icon-warn"></span>
//                             </i>
//                             <em style={{display: db.pass > 0 ? '' : 'none'}}>{db.pass}项
//                                 <span className="weui-icon-success"></span>
//                             </em>
//                         </a>
//                     </li>
//                     )}
//                 </ul>
//                 <ul className="deadline-list">
//                     <li>
//                         <span>{dataTimeFormatter(truck.on_licence * 1000, 9)}上牌</span>
//                         <span>{dataTimeFormatter(truck.inspection * 1000, 9)}年检到期</span>
//                     </li>
//                     <li>
//                         <span>{dataTimeFormatter(truck.compulsory * 1000, 9)}交强险到期</span>
//                         <span>{dataTimeFormatter(truck.commercial * 1000, 9)}商业险到期</span>
//                     </li>
//                 </ul>
//             </div>
