import React, { Component } from 'react'
// import { Link } from 'react-router'

import Navbar from 'COMPONENT/Navbar/roomfot'
// import { injectReducer } from 'REDUCER'
// injectReducer('room', require('REDUCER/room/').default)

// @connect(
//   ({ room }) => ({ room }),
//   require('ACTION/room').default
// )

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
        <div className="BoxBt55">
            <div className="check">
                <figure><img src="http://usr.im/80x80" alt="" /></figure>
                <figcaption>一汽解放 解放J6P牵引车</figcaption>
                <span>检测师：<i>黄萌</i></span>
                <span>检测时间：<i>2016-09-20</i></span>
            </div>

            <div className="basic">
                <h3>基本信息</h3>
                <ul className="basic-list">
                    <li>
                        <span>里程数<em>5900000公里</em></span>
                        <span>上牌地点<em>上海</em></span>
                    </li>
                    <li>
                        <span>上牌时间<em>2016-8-19</em></span>
                        <span>年检到期时间<em>2018-08</em></span>
                    </li>
                    <li>
                        <span>交强险到期时间<em>2018-08</em></span>
                        <span>商业险到期时间<em>2018-08</em></span>
                    </li>
                    <li>
                        <span>出险记录<em>2次</em></span>
                    </li>
                </ul>
            </div>

            <div className="trade">
                <h3>可交易性查验(5项)</h3>
                <ul className="trade-list">
                    <li>
                        是否达到国家强制报废标准
                        <span className="span weui-icon-success"></span>
                        <i>是</i>
                        <span className="span weui-icon-warn"></span>
                        <i className="atypism">否</i>
                    </li>
                    <li>
                        发动机号与机动车登记证号
                        <span className="span weui-icon-success"></span>
                        <i>是</i>
                        <span className="span weui-icon-warn"></span>
                        <i className="atypism">否</i>
                    </li>
                    <li>
                        车辆识别代号或车架号码
                        <span className="span weui-icon-success"></span>
                        <i>是</i>
                        <span className="span weui-icon-warn"></span>
                        <i className="atypism">否</i>
                    </li>
                    <li>
                        真实合法的车辆法定证明
                        <span className="span weui-icon-success"></span>
                        <i>是</i>
                        <span className="span weui-icon-warn"></span>
                        <i className="atypism">否</i>
                    </li>
                    <li>
                        是否法律法规禁止经营的车辆
                        <span className="span weui-icon-success"></span>
                        <i>是</i>
                        <span className="span weui-icon-warn"></span>
                        <i className="atypism">否</i>
                    </li>
                </ul>
            </div>

            <div className="hitch">
                <div className="stoppage">
                    事故故障车排查(13项)
                    <p>无重大事故、水泡、火烧痕迹，性能部件正常使用等</p>
                </div>
                <ul className="hitch-list">
                    <li>
                        事故车排查
                    </li>
                    <li>
                        驾驶室是否存在严重开裂、变形
                        <span className="span weui-icon-success"></span>
                        <i>是</i>
                        <span className="span weui-icon-warn"></span>
                        <i className="atypism">否</i>
                    </li>
                    <li>
                        驾驶室加强梁是否受损
                        <span className="span weui-icon-success"></span>
                        <i>是</i>
                        <span className="span weui-icon-warn"></span>
                        <i className="yes">否</i>
                    </li>
                    <li>
                        发动机是否移位、破损
                        <span className="span weui-icon-success"></span>
                        <i>是</i>
                        <span className="span weui-icon-warn"></span>
                        <i className="yes">否</i>
                    </li>
                    <li>
                        变速箱是否移位、破损
                        <span className="span weui-icon-success"></span>
                        <i>是</i>
                        <span className="span weui-icon-warn"></span>
                        <i className="yes">否</i>
                    </li>
                    <li>
                        车架是否存在开裂或变形
                        <span className="span weui-icon-success"></span>
                        <i>是</i>
                        <span className="span weui-icon-warn"></span>
                        <i className="yes">否</i>
                    </li>
                </ul>
            </div>

            <ul className="inspect-list">
                <li>
                    故障车排查
                </li>
                <li>
                    驾驶室翻转装置是否有效
                    <span className="span weui-icon-success"></span>
                    <i>是</i>
                    <span className="span weui-icon-warn"></span>
                    <i className="yes">否</i>
                </li>
                <li>
                    发动机及附件是否严重漏油/水/气
                    <span className="span weui-icon-success"></span>
                    <i>是</i>
                    <span className="span weui-icon-warn"></span>
                    <i className="yes">否</i>
                </li>
                <li>
                    仪表板指示是否正常
                    <span className="span weui-icon-success"></span>
                    <i>是</i>
                    <span className="span weui-icon-warn"></span>
                    <i className="yes">否</i>
                </li>
                <li>
                    制动系统是否正常有效，不跑偏
                    <span className="span weui-icon-success"></span>
                    <i>是</i>
                    <span className="span weui-icon-warn"></span>
                    <i className="yes">否</i>
                </li>
                <li>
                    行驶中是否存在严重抖动或严重跑偏
                    <span className="span weui-icon-success"></span>
                    <i>是</i>
                    <span className="span weui-icon-warn"></span>
                    <i className="yes">否</i>
                </li>
            </ul>
        </div>
        <Navbar style={{top: '-60px'}}/>
    </div>
    )
  }
}
