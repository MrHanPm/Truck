import React, { Component } from 'react'

export default class About extends Component {
  render () {
    return (
      <div className="pay TrLiBox" style={{background: '#fff'}}>
        <span className="pay-succes">
          <i className="weui-icon-success weui-icon_msg"></i>
        </span>
        <p>支付成功</p>
        <a href="/index" className="continue">继续拍卖</a>
        <a href="/auction" className="go-home">回到主页</a>
        <em>咨询电话</em>
        <a href="tel:400-0000-0000" className="phone">400-0000-0000</a>
      </div>
    )
  }
}
