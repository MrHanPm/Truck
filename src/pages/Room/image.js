import React, { Component } from 'react'
import NavbarPay from '../Navbar/roomfot'
import { typeIsCoun} from '../../utils/dateTimeFormatter'
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
      roomId: '',
      beginDate:'',
      finishDate:''
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
      if(XHR.isAlert(res)) {
        this.setState({
          isData: true,
          DATA: res.data,
          isPay: TRUCK.paid_for_deposite,
          state: TRUCK.status,
          deposite: TRUCK.deposite,
          roomId: TRUCK.roomId,
          beginDate: TRUCK.begin_date,
          finishDate: TRUCK.finish_date
        })
      }
    })
  }
  Pay () {
    let { params: { truckId } } = this.props
    let url = `/pay/${this.state.roomId}/${truckId}/${this.state.deposite}`
    this.context.router.replace(url)
  }
  componentDidMount() {

  }
  render () {
    let { DATA, isPay, state, deposite, isData,beginDate,finishDate } = this.state
    let footBtn = <NavbarPay show={true} numb={deposite} Pay={this.Pay} />

    if (state == '4' || state == '5'){ footBtn = <NavbarPay show={false} /> }
    if (state != '4' && state != '5' && isPay){ footBtn = <Navbar /> }

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


