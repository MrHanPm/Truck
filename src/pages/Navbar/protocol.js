import React, { Component } from 'react'
import { Alert, Tool } from '../../utils/tool'


export default class Navbar extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  render () {
    return (
      <div className={`agree-btn ${this.props.className}`} style={this.props.style}>
        <span className="agree" onClick={() => {Alert.to('抱歉，您未同意竞拍协议')}}>不同意</span>
        <span className="disagree" onClick={() => {
          let pathname = Tool.localItem('URL')
          let url,tos
          console.log(pathname.indexOf('?'))
          if(pathname.indexOf('?') !== -1){
            url = pathname.substring(1, pathname.indexOf('?'))
          }else{
            url = pathname.substring(1, pathname.length)
          }
          tos = url + '/1'
          this.context.router.replace(tos)
        }}>同意</span>
      </div>
    )
  }
}
