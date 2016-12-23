import React, { Component } from 'react'

class Alert extends Component {
  componentDidMount() {
      document.getElementById("AlertCont").addEventListener('touchend', (e) => {
        clearTimeout(AlertTimeOut)
        document.getElementById("AlertCont").setAttribute('class', 'notification')
        e.preventDefault()
      }, false)
  }
  render() {
    return (
      <div className="notification" id="AlertCont">
          <div className="notification-inner">
              <div className="notification-content">
                  <div className="notification-title" id="AlertTxt"></div>
              </div>
              <div className="notification-handle-bar"></div>
          </div>
      </div>
    )
  }
}

export default Alert
