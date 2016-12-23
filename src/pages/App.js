import React from 'react'
import AlertBox from '../views/errMsg'



const App = ({ children, location }) => (
  <div style={{height: '100%'}}>
    { children }
    <AlertBox />
    <div id="AllMsg"></div>
  </div>
)

export default App
