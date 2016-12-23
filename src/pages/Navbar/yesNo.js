import React, { Component } from 'react'
// import { Link } from 'react-router'


export default class Navbar extends Component {
  render () {
    return (
      <div className={`sure-btn ${this.props.className}`} style={this.props.style}>
        <span className="sure" onClick ={() => {window.history.back()}}>取消</span>
        <span className="cancel" onClick={() => this.props.addClock()}>确定</span>
      </div>
    )
  }
}
