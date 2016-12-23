import React, { Component } from 'react'
// import { Link } from 'react-router'

import Navbar from 'COMPONENT/Navbar/protocol'


export default class TruckList extends Component {
  componentWillMount () {
    // let { params: { truckId } } = this.props
    // this.props.getImg(truckId)
  }
  componentDidMount() {

  }

  render () {
    return (
      <div style={{height: '100%'}}>
        <div className="protocol BoxBt55">
          <p>在易卡通平台依据《用户注册协议》注册的用户（即“竞拍人”），在同意本协议以下全部条款后，方有资格享受易卡通平台（以下简称“平台”）提供的竞拍服务（以下简称“服务”）。您使用本平台提供的服务即意味着同意与本平台签订本协议并同意受本协议约束，使用服务前请认真阅读本协议。</p>
          <p>
            <h4>第一条：立约背景</h4>
            <p>为维护易卡通平台的竞拍活动秩序，规范竞拍人参与竞拍活动的行为，保障用户的合法权益，基于相应的竞拍流程与规则（以下简称：竞拍规则）和易卡通开放平台公示的规则，特制定本协议。</p>

            <h4>第二条：参与竞拍的条件</h4>
            <p>同时符合以下条件的用户方能参与平台提供的竞拍活动：
            2.1 用户为易卡通平台会员，拥有独立的易卡通平台用户名；
            2.2 同意本协议及竞拍规则中的条款；
            2.3 按照竞拍规则缴纳相应的竞拍保证金；
            </p>

            <h4>第三条：服务说明</h4>
            <p>本平台开展的竞拍活动要求参与竞拍的用户缴纳相应保证金，以取得竞拍资格。用户通过本平台参与竞拍活动前应仔细阅读竞拍规则，并应予以遵守。</p>
            <h4>第四条：用户权利和义务</h4>
          </p>
        </div>
        <Navbar style={{top: '-60px'}}/>
      </div>
    )
  }
}
