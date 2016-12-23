import React, { Component } from 'react'
// 行内进行加载动画。。。
class Loading extends Component {
  render () {
    return (
        <div className="loading visible" style={{marginTop: this.props.DATA ? '50%' : '' }}>
            <span className="loading-ring"> </span>
        </div>
    )
  }
}
// 没有更多提示
class NoMor extends Component {
  render () {
    return (
        <p className="noMor">～我是有底线嘀～</p>
    )
  }
}
// 覆盖层 加载动画。。。
class LoadBox extends Component {
  render () {
    return (
      <div className="jump-cover">
          <div className="loading visible">
              <span className="loading-ring"> </span>
          </div>
      </div>
    )
  }
}
// 没有数据
class NoData extends Component {
  render () {
    return (
        <div className="noDataBox"></div>
    )
  }
}

export { Loading, NoMor, LoadBox, NoData }
