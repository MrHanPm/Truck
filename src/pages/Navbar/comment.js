import React, { Component } from 'react'
import { Link } from 'react-router'


export default class Navbar extends Component {
  render () {
    let text = '我来点评一下'
    if (this.props.text) {
        text = this.props.text
    }
    let isHide = false
    if (text !== '我来点评一下') {
      isHide = true
    }
    return (
      <div className={`comment ${this.props.className}`} style={this.props.style}>
        <span className="return" onClick ={() => {window.history.back()}}></span>
        <Link className="comment-on" style={{display: isHide ? 'none' : ''}} to={`/review/${this.props.roomId}/${this.props.truId}`}>{text}</Link>
        <em className="comment-on" style={{display: isHide ? '' : 'none'}} onClick ={() => this.props.onSave()}>{text}</em>
        <Link className="menu" to="/index"></Link>
      </div>
    )
  }
}
