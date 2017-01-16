import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory} from 'react-router'

import './assets/less/foot.less'
import './assets/less/secondHandCar.less'
import './assets/less/css.less'
import './assets/less/loading.less'

import App from './pages/App'
import Welcome from './pages/Welcome'
import TruckList from './pages/Room/'
import TruckMsg from './pages/Truck/'
import TruckReport from './pages/Truck/report'
import TruckDetail from './pages/Truck/detail'
import TruckImage from './pages/Room/image'
import Auction from './pages/Room/auction'

import BidRecord from './pages/BidRecord'
import MarginDetails from './pages/MarginDetails'
import Margin from './pages/Margin'
import Comment from './pages/Comment'
import Clock from './pages/Form/clock'
import Pay from './pages/Form/pay'
import Review from './pages/Form/review'
import About from './views/about'
import Protocol from './pages/Protocol'
import Url from './pages/url'
import Addres from './pages/address'
import Ok from './views/ok'

import Err from './pages/404'

const MOUNT_NODE = document.getElementById('container')
ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>
        <Route path="room/:id" component={TruckList}/>
        <Route path="truck/:roomId/:truId" component={TruckMsg}/>
        <Route path="clock/:roomId(/:truId)" component={Clock}/>
        <Route path="pay/:roomId/:truId/:amount(/:yn)" component={Pay}/>
        <Route path="room/truck/:truckId" component={TruckImage}/>
        <Route path="report/:truId" component={TruckReport}/>
        <Route path="detail/:modelId" component={TruckDetail}/>
        <Route path="auction" component={Auction}/>
        <Route path="margindetails/:depositeId" component={MarginDetails}/>
        <Route path="margin/:bidId" component={Margin}/>
        <Route path="bidRecord/:roomId/:truId" component={BidRecord}/>
        
        <Route path="comment/:roomId/:truId" component={Comment}/>
        <Route path="review/:roomId/:truId(/:pid)" component={Review}/>
        <Route path="about" component={About}/>
        <Route path="protocol(/:msg)" component={Protocol}/>
        <Route path="ok" component={Ok}/>
        <Route path="addres" component={Addres}/>
        <Route path="*" component={Err}/>
      </Route>
    </Router>
), MOUNT_NODE)


       
/*
  <IndexRoute path="url" component={Url}/>
  当前路由树如下    
  ├ /                             // 动态／URL导航
  ├ /index                        // 首页专场列表
  ├ /room/:id                     // 专场
  ├ /room/truck/:truckId          // 卡车图片
  ├ /truck/:roomId/:truId         // 车信息
  ├ /report/:truId                // 车信息
  ├ /detail/:truId                // 车信息
  ├ 
  ├ /auction                      // 我的竞拍
  ├ /bidRecord                    // 竞拍排行榜
  ├ /margindetails                // 保证金页
  ├ /margin                       // 订单状态
  ├ /comment                      // 评价列表
  ├ /clock                        // 时间提醒
  ├ /pay                          // 支付
  ├ /review                       // 发表评论
  ├ /about                        // 规则描述
  ├ /protocol                     // 服务协议
  ├ /ok                           // 支付成功
  ├
  ├ 
*/
