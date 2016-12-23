import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from 'COMPONENT/Navbar/roomfot'
import {getPNA} from 'UTIL/posName'
import { Tool } from 'UTIL/errMsg'
import { injectReducer } from 'REDUCER'
injectReducer('room', require('REDUCER/room/').default)

@connect(
  ({ room }) => ({ room }),
  require('ACTION/room/').default
)

export default class TruckList extends Component {
  componentWillMount () {
    let { params: { truckId } } = this.props
    let sessionId = Tool.localItem('sessionId')
    this.props.getImg(sessionId, truckId)
  }
  componentDidMount() {
    // state = this.props || {}
  }

  render () {
    let { room: { truckImg } } = this.props
    let DATA = []
    if (typeof (truckImg) == 'object' && truckImg.length > 0) {
      DATA = truckImg
    }
    return (
      <div style={{height: '100%'}}>
        <div className="container">
          <ul className="picture-list">
            { DATA.map(db =>
            <li>
              <figure><img src={`http://imgb.360che.com${db.src}`} alt="" /></figure>
              <figcaption>{ getPNA(db.pos_name) }</figcaption>
              <span>{ db.introduction }</span>
            </li>
            )}
          </ul>
        </div>
        <Navbar />
      </div>
    )
  }
}
