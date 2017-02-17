// 此处配置 根访问路径 以及 全局错误处理
// 更多配置请根据业务逻辑自行实现
// console-log XHR:Failed 详情请看控制台
// 后端 API 地址，最好以 http(s):// 打头
export const HTTP = 'http://tao.360che.com'

// export const HURL = 'http://2b.360che.com'
export const HURL = 'http://bbs.360che.com'

export const errHandler = (e) => {
  console.error(e)
  // alert('网络异常或服务器错误！')
  // window.location.href = 'http://tao-yufabu.360che.com/member'
}



window.routerChange = function(){
    let WXCFG = JSON.parse(localStorage.getItem('WXCFG'))
    wx.config({
        debug: false,
        appId: WXCFG.appId,
        timestamp: WXCFG.timestamp,
        nonceStr: WXCFG.noncestr,
        signature: WXCFG.signature,
        jsApiList: [
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'onMenuShareAppMessage',
            'uploadImage',
            'chooseImage',
            'chooseWXPay'
        ]
    })
    wx.ready(function(){ wx.hideOptionMenu() })
    // wx.config({
    //     debug: true,
    //     appId: 'wx15f8f4a56794b12f',
    //     timestamp: 1482978417,
    //     nonceStr: '586474710f2cd',
    //     signature: '99971a586237c9180a29d99bf5686b9dd243a5c0',
    //     jsApiList: ['hideOptionMenu','showOptionMenu','closeWindow','onMenuShareAppMessage','uploadImage','chooseImage','chooseWXPay']
    // })
}



/*本地存储数据名称表(Tool.localItem)
WXCFG   微信配置
CITYID  {name:'鄂尔多斯市',val:150600}

USERINFO    {"uid":"487992","nickname":"arui128","email":"","mobile":"13520344997"}

URL   

TRUCK

 ALARMCLOCK  // 闹钟定时器
*/
