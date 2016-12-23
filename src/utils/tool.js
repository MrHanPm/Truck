
const Tool = {}

// window.routerChange = function(){
//     wx.config(getWxConfig.get())
//     wx.ready(function(){wx.hideOptionMenu()})
// }
window.AlertTimeOut = ''
window.XHRLIST = []

Tool.ga = () => {
        let nac = JSON.parse(Tool.localItem('vipLodData'))
        let users = '员工'
        if(nac.usercategory == '2'){
            users = '老板'
        }
        let delname = nac.dealersalesallbrandsname.replace(/\,/g, "|")

        ga('send','event','首页加载','首页加载',{
            dimension2:users,
            dimension3:nac.dealername,
            dimension4:delname,
            dimension5: nac.userid
        })
}

Tool.gaTo = (txt, name, lab) => {
    ga('send','event', txt, name, lab)
}

/**
 * 格式化时间
 * 
 * @param {any} t
 * @returns
 */
Tool.formatDate = function (str) {
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return ''
    } else if (time / 1000 < 60) {
        return '刚刚'
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前'
    } else {
        return parseInt(time / 31536000000) + '年前'
    }
}

/**
 * 本地数据存储或读取
 * 
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function (key, value) {
    if (arguments.length == 1) {
        return localStorage.getItem(key)
    } else {
        return localStorage.setItem(key, value)
    }
}

/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key)
    }
    return localStorage.removeItem()
}


//验证手机号
Tool.checkPhone = function (phone){
    if((/^1[3|4|5|7|8]\d{9}$/.test(phone))){ return true }else{return false}
}
Tool.getQueryString = function(name) {
    let conts = window.location.hash.split("?")
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    let r = conts[1].match(reg)
    if (r != null) {
        return unescape(r[2])
    }
    else {
        return null
    }
}

//弹窗提示的封装
const Alert = {}
Alert.to = function(val) {
        clearTimeout(AlertTimeOut)
        let AlertCont = document.getElementById("AlertCont")
        let AlertTxt = document.getElementById("AlertTxt")
        AlertTxt.innerHTML = val
        AlertCont.setAttribute('class','notification notification-in')
        AlertTimeOut = setTimeout(() => Alert.out(),4000)
}
Alert.out = function(){
    let AlertCont = document.getElementById("AlertCont")
    AlertCont.setAttribute('class','notification')
}
//弹窗提示的封装
const AllMsgToast = {}
AllMsgToast.to = function(val) {
        let AlertTxt = document.getElementById("AllMsg")
        AlertTxt.innerHTML = val
        AlertTxt.setAttribute('class','active')
        let AllMsgToastOut = setTimeout(() => AllMsgToast.out(),2000)
}
AllMsgToast.out = function(){
    let AlertCont = document.getElementById("AllMsg")
    AlertCont.removeAttribute('class')
}

export {Tool , Alert, AllMsgToast}
