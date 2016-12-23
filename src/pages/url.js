import React, { Component } from 'react'



export default class Url extends Component {
  render () {
    return (
      <ul className="UrlPage">
        <li><a href="#index">首页</a></li>
        <li><a href="#room/11">专场内</a></li>
        <li><a href="#room/truck/22">汽车大图</a></li>
        <li><a href="#truck/11/11">卡车详细</a></li>
        <li><a href="#report/11">基本信息</a></li>
        <li><a href="#detail/11">基本配置</a></li>
        <li><a href="#auction">我的竞拍</a></li>
        <li><a href="#bidRecord">竞拍排行榜</a></li>
        <li><a href="#marginDetails">保证金页</a></li>
        <li><a href="#margin">订单状态</a></li>
        <li><a href="#comment">评价列表</a></li>
        <li><a href="#clock">时间提醒</a></li>
        <li><a href="#pay">支付页面</a></li>
        <li><a href="#review">发表评论</a></li>
        <li><a href="#about">规则描述</a></li>
        <li><a href="#protocol">服务协议</a></li>
        <li><a href="#ok">支付成功</a></li>
        <li><a href="#addres">地址选择</a></li>
      </ul>
    )
  }
}
