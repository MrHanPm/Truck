import React, { Component } from 'react'
import { Tool } from '../../utils/tool'
import XHR from '../../services/service'
import { LoadBox} from '../../views/more'

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
  constructor (props) {
    super(props)
    this.state = {
        isData:false,
        DB: []
    }
  }
  componentWillMount () {
    let { params: { modelId } } = this.props
    XHR.getTruMsg(modelId)
    .then((db) => {
        if (!db) return
        let res = JSON.parse(db)
        let DATA = res.data
        if (res.status === 1) { 
            alert(res.data.error_msg)
            window.location.href = 'http://tao-yufabu.360che.com/member'
            return
        }
        // DATA.map((az, inx) => {
        //     if(az.is_show === 0){
        //         DATA.splice(inx,1)
        //     }
        // })
        this.setState({
            isData: true,
            DB: DATA
        })
    })
  }

  render () {
    let { DB, isData } = this.state
    return (
    <div style={{height: '100%'}}>
        <div className="BoxBt55">
            <header style={{display: 'none'}}>
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
                    {DB.map((db,index) =>
                    <li key={index}>
                        <span>{db.aname}<em>{db.avalue ? db.avalue : '-' } {db.unit? db.unit : '-'}</em></span>
                    </li>
                    )}
                </ul>
            </div>
            <div className="engine" style={{display: 'none'}}>
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
        <Navbar style={{top: '-50px'}}/>
        <div style={{display: !isData ? '':'none'}}><LoadBox /></div>
    </div>
    )
  }
}
