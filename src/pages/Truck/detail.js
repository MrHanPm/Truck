import React, { Component } from 'react'
// import { Link } from 'react-router'
import { Tool } from 'UTIL/errMsg'
import { connect } from 'react-redux'
import Navbar from 'COMPONENT/Navbar/roomfot'
import { injectReducer } from 'REDUCER'
injectReducer('truckMsg', require('REDUCER/truck/').default)

@connect(
  ({ truckMsg }) => ({ truckMsg }),
  require('ACTION/truck/').default
)

export default class TruckList extends Component {
  constructor (props) {
    super(props)
    this.state = {
        DB: []
    }
  }
  componentWillMount () {
    let sessionId = Tool.localItem('sessionId')
    let { params: { modelId } } = this.props
    this.props.modeMsg(sessionId, modelId)
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.truckMsg.mode) {
        this.setState({ 
            DB: nextProps.truckMsg.mode
        })
    }
  }
  render () {
    let { DB } = this.state
    return (
    <div style={{height: '100%'}}>
        <div className="BoxBt55">
            <header>
                <figure><img src="http://usr.im/80x80" alt="" /></figure>
                <figcaption>一汽解放 解放J6P牵引车</figcaption>
                <div className="reference">
                    <span>新车参考价：<em>30.88万</em></span>
                    <span>当前价: <i>24.88</i> <em>万</em></span>
                </div>
            </header>
            <div className="configure">
                <h3>基本配置</h3>
                <ul>
                    {DB.map(db =>
                    <li>
                        <span>{db.aname}<em>{db.avalue}{db.unit}</em></span>
                    </li>
                    )}
                </ul>
            </div>
            <div className="engine">
                <h3>发动机</h3>
                <ul>
                    <li>
                        <span>发动机<em>福田康明斯ISGe4 380</em></span>
                        <span>驱动形式<em>6X4</em></span>
                    </li>
                    <li>
                        <span>驱动形式<em>1800+2700mm</em></span>
                        <span>车身长度<em>7.06米</em></span>
                    </li>
                    <li>
                        <span>轴距<em>BJ4253SNFKB-XJ</em></span>
                        <span>车身长度<em>7.06米</em></span>
                    </li>
                    <li>
                        <span>车身宽度<em>2.49米</em></span>
                        <span>车身高度<em>3.41米</em></span>
                    </li>
                    <li>
                        <span>轮距<em>前轮距:2020/2020mm;后轮距: 1800mm</em></span>
                    </li>
                </ul>
            </div>
        </div>
        <Navbar style={{top: '-60px'}}/>
    </div>
    )
  }
}
