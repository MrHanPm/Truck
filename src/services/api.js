import { HTTP } from './xhr/config'
var SESSIONID = localStorage.getItem('SESSIONID')

class API {
// 获取当天拍卖场列表
  getToday () {
    return  `${HTTP}/salesroom/today?session_id=${SESSIONID}`
  }
// 获取登录用户信息
  getUsInfo () {
    return  `${HTTP}/member/info?session_id=${SESSIONID}`
  }

// 出价排行榜 
  getBids (roomId, truId, page) {
    return `${HTTP}/truck/bids/${roomId}/${truId}/${page}/10?session_id=${SESSIONID}`
  }

// 出价 
  potPay () {
    return `${HTTP}/truck/bid?session_id=${SESSIONID}`
  }

// 缴纳保证金 
  cotPay () {
    return `${HTTP}/deposite/create?session_id=${SESSIONID}`
  }
// 支付页面
  goPay (orderId) {
    return `${HTTP}/pay/deposite/${orderId}?session_id=${SESSIONID}`
  }
// 获取专场汽车列表 
  getSrom (roomId, page) {
    return `${HTTP}/salesroom/trucks/${roomId}/${page}/10?session_id=${SESSIONID}`
  }
  
// 获取汽车图片 
  getImg (truId) {
    return `${HTTP}/truck/pictures/${truId}?session_id=${SESSIONID}`
  }

//  获取评论列表 
  getPostsList () {
    return `${HTTP}/interface/app/index.php?session_id=${SESSIONID}&action=tao&method=comments&items=10`
  }

// 发表评论
  addPosts () {
    return `${HTTP}/interface/app/index.php?session_id=${SESSIONID}&action=tao&method=reply`
  }

// 车详情 
  getMsg (roomId, truId) {
    return `${HTTP}/truck/detail/${roomId}/${truId}?session_id=${SESSIONID}`
  }
// 车配置信息 
  getTruMsg (modelId) {
    return `${HTTP}/truck/configdetail/${modelId}?session_id=${SESSIONID}`
  }


/** ------------ -----------  我的  ---------------- */
// 我的竞拍 
  myBid (page) {
    return `${HTTP}/member/bids/${page}/10?session_id=${SESSIONID}`
  }
// 我的获拍 
  myWin (page) {
    return `${HTTP}/member/wins/${page}/10?session_id=${SESSIONID}`
  }
// 我的保证金 
  myDep (page) {
    return `${HTTP}/member/deposite/${page}/10?session_id=${SESSIONID}`
  }
// 我的提醒 
  myRem (page) {
    return `${HTTP}/member/reminds/${page}/10?session_id=${SESSIONID}`
  }

// 获拍详情 
  myWinMsg (bidId) {
    return `${HTTP}/member/bidview/${bidId}?session_id=${SESSIONID}` 
  }
// 保证金详情 
  myDepMsg (depositeId) {
    return `${HTTP}/member/depositeview/&{depositeId}?session_id=${SESSIONID}`
  }
// 创建提醒 
  myRemCrt () {
    return `${HTTP}/member/remind?session_id=${SESSIONID}` 
  }

// 删除提醒 
  delRem (remindId) {
    return `${HTTP}/member/reminddel/${remindId}?session_id=${SESSIONID}` 
  }

// 获取城市列表
  getArea () {
    return `${HTTP}/area/all?session_id=${SESSIONID}`
  }

// 是否登录
  isLogin () {
    return `${HTTP}/salesroom/today?session_id=${SESSIONID}`
  }

}

// 实例化后再导出
export default new API()
