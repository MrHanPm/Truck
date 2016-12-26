import xhr from './xhr/'
import API from './api'

class XHR {

// 获取当天拍卖场列表
  getToday () {
    return xhr({ 
              url: API.getToday(),
              type: 'get'
          })
    }
// 获取登录用户信息
  getUsInfo () {
    return xhr({ 
              url: API.getUsInfo(),
              type: 'get'
          })
  }

// 出价排行榜 
  getBids (roomId, truId, page) {
    return xhr({ 
              url: API.getBids(roomId, truId, page),
              type: 'get'
          })
  }

// 拍卖出价 
// salesroom_id  int 是 拍卖场id
// truck_id  int 是 卡车id
// increase  int 是 加价金额
  potPay (json) {
    return xhr({ 
              url: API.potPay(),
              type: 'post',
              body: json
          })
  }

// 缴纳保证金 
// salesroom_id  int 是 拍卖场id
// truck_id  int 是 卡车id
// name  string  是 保证金缴纳者姓名
// mobile
// city_id int 是 缴纳者所在城市id
  cotPay (json) {
    return xhr({ 
              url: API.cotPay(),
              type: 'post',
              body: json
          })
  }
// 支付页面
// order_id  string  是 定金支付订单号
  goPay (orderId) {
    return xhr({ 
              url: API.goPay(orderId),
              type: 'get'
          })
  }
// 拍卖场卡车列表
  getSrom (roomId, page) {
    return xhr({ 
              url: API.getSrom(roomId, page),
              type: 'get'
          })
  }
  
// 获取汽车图片 
  getImg (truId) {
    return xhr({ 
              url: API.getImg(truId),
              type: 'get'
          })
  }

//  获取评论列表 
// salesroom_id  int 是 拍卖场id
// truck_id  int 是 拍卖卡车id
// page  int 否 页数
  getPostsList (json) {
    return xhr({ 
              url: API.getPostsList(),
              type: 'get',
              body: json
          })
  }

// 发表评论
// salesroom_id  int 是 拍卖场id
// truck_id  int 是 拍卖卡车id
// star  int 是 星级,取值 1 到 5
// uid int 是 用户id
// message string  是 评论内容
// tags  int 是
// pid int 否 被回复的评论的id
// attachment  string  否 短横线“-”分割的评论里图片
  addPosts (json) {
    return xhr({ 
              url: API.addPosts(),
              type: 'post',
              body: json
          })
  }

// 车详情 
  getMsg (roomId, truId) {
    return xhr({ 
              url: API.getMsg(roomId, truId),
              type: 'get'
          })
  }
// 车配置信息 
  getTruMsg (modelId) {
    return xhr({ 
              url: API.getTruMsg(modelId),
              type: 'get'
          })
  }


/** ------------ -----------  我的  ---------------- */
// 我的竞拍 
  myBid (page) {
    return xhr({ 
              url: API.myBid(page),
              type: 'get'
          })
  }
// 我的获拍 
  myWin (page) {
    return xhr({ 
              url: API.myWin(page),
              type: 'get'
          })
  }
// 我的保证金 
  myDep (page) {
    return xhr({ 
              url: API.myDep(page),
              type: 'get'
          })
  }
// 我的提醒 
  myRem (page) {
    return xhr({ 
              url: API.myRem(page),
              type: 'get'
          })
  }

// 获拍详情 
  myWinMsg (bidId) {
    return xhr({ 
              url: API.myWinMsg(bidId),
              type: 'get'
          })
  }
// 保证金详情 
  myDepMsg (depositeId) {
    return xhr({ 
              url: API.myDepMsg(depositeId),
              type: 'get'
          })
  }
// 创建提醒 
// salesroom_id  int 是 拍卖场id
// truck_id  int 是 卡车id
// mode  string  是 提醒方式 sms 短信提醒 wechat 微信提醒
// point string  是 提醒时间点 start 拍卖会开始前 end 拍卖会开始后
// difference  int 是 拍卖会开始前或开始后多少时间内提醒，单位：秒
  myRemCrt (json) {
    return xhr({ 
              url: API.myRemCrt(),
              type: 'post',
              body: json
          }) 
  }

// 删除提醒 
  delRem (remindId) {
    return xhr({ 
              url: API.delRem(remindId),
              type: 'get'
          })
  }

// 获取城市列表
  getArea () {
    return xhr({ 
              url: API.getArea(),
              type: 'get'
          })
  }

// 是否登录
  isLogin () {
    return xhr({ 
              url: API.isLogin(),
              type: 'get'
          })
  }
  
}

// 实例化后再导出
export default new XHR()
