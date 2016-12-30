import React, { Component } from 'react'
import NavbarPay from '../Navbar/roomfot'
import { getPNA } from '../../utils/posName'
import { Tool } from '../../utils/tool'
import { LoadBox} from '../../views/more'
import XHR from '../../services/service'


class Navbar extends Component {
  render () {
    return (
      <div className="comment">
        <span className="return" onClick ={() => {window.history.back()}}></span>
        <em className="comment-on" onClick ={() => {window.history.back()}}>去出价</em>
      </div>
    )
  }
}

export default class TruckList extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      isData:false,
      DATA:[],
      isPay: false,
      state: 2,
      deposite: '',
      roomId: ''
    }
    this.Pay = this.Pay.bind(this)
  }
  componentWillMount () {
    let { params: { truckId } } = this.props
    let TRUCK = JSON.parse(Tool.localItem('TRUCK'))
    XHR.getImg(truckId)
    .then((db) => {
      if (!db) return
      let res = JSON.parse(db)
      if (res.status === 1) { 
        alert(res.data)
        window.location.href = 'http://tao-yufabu.360che.com/member'
        return
      }
      this.setState({
        isData: true,
        DATA: res.data,
        isPay: TRUCK.paid_for_deposite,
        state: TRUCK.status,
        deposite: TRUCK.deposite,
        roomId: TRUCK.roomId
      })
    })
  }
  Pay () {
    let { params: { truckId } } = this.props
    let nub = parseInt(this.state.deposite)
    let url = `/pay/${this.state.roomId}/${truckId}/${nub}`
    this.context.router.replace(url)
  }
  componentDidMount() {

  }
  render () {
    let { DATA, isPay, state, deposite, isData } = this.state
    let footBtn
    switch (state) {
        case '4':
            footBtn = <NavbarPay show="false" />
            break
        default: 
           footBtn = <NavbarPay show="true" 
                                numb={deposite}
                                Pay={this.Pay}/>
    }
    if (isPay) {
        footBtn = <Navbar />
    }
    return (
      <div style={{height: '100%'}}>
        <ul className="picture-list">
          { DATA.map(db =>
          <li>
            <figure><img src={`http://imgb.360che.com${db.src}`} alt="" /></figure>
            <figcaption>{ getPNA(db.pos_name) }</figcaption>
            <span>{ db.introduction }</span>
          </li>
          )}
        </ul>
        { footBtn }
        <div style={{display: !isData ? '':'none'}}><LoadBox /></div>
      </div>
    )
  }
}


