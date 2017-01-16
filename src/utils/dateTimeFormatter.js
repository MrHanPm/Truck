/**
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */
const zerofill = val => val >= 10 ? val : '0' + val
/* 相当于：
  var zerofill = function (val) {
    return val >=10 ? val : '0' + val
  };
*/

/**
 * 格式化时间
 * @param  {Number} time 时间戳
 * @param  {Number} type 格式化类型
 * @return {String}
 */
export const dataTimeFormatter = (time, type) => {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let second = date.getSeconds()
  
  switch (type) {
    case 0: // 01秒
      return `${zerofill(second)}`
    case 1: // 01分
      return `${zerofill(minutes)}`
    case 2: // 01时
      return `${zerofill(hours)}`
    case 3: // 01-05
      return `${zerofill(month)}-${zerofill(day)}`
    case 4: // 11:12
      return `${zerofill(hours)}:${zerofill(minutes)}`
    case 5: // 11时12分33秒
      return `${zerofill(hours)}时${zerofill(minutes)}分${zerofill(second)}秒`
    case 6: // 2015-01-05
      return `${year}-${zerofill(month)}-${zerofill(day)}`
    case 11: // 2015年01月05日
      return `${year}年${zerofill(month)}月${zerofill(day)}日`
    case 9: // 2015年01月
      return `${year}年${zerofill(month)}月`
    case 7: // 2015-01-05 11:12
      return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}`
    case 8: // 08月31日12:22
      return `${zerofill(month)}月${zerofill(day)}日${zerofill(hours)}:${zerofill(minutes)}`
    case 10: // 08-31 12:22
      return `${zerofill(month)}-${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}`
    default: // 2015-01-05 11:12:13
      return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
  }
}

/**
*是否显示设置时间
*/
export const typeIsCoun = (Stime, Etime, status) => {
  // let Now = Math.round(new Date().getTime())
  let json = {}
  // json.Nt = dataTimeFormatter(Now)
  // 真实
  json.St = Stime
  json.Et = Etime
  localStorage.setItem('ALARMCLOCK', JSON.stringify(json))
  
  if (status == '4' || status == '5') {
    return '已结束'
  }else{
    return '在进行'
  }
}

export const dataTimeCountdown = (Stime, Etime, id, status, funs) => {
  let Now = Math.round(new Date().getTime())
  let Nt = dataTimeFormatter(Now)
  // 模拟
  // let St = dataTimeFormatter(1478045471000)
  // let Et = dataTimeFormatter(1478920271000)

  // 真实
  let St = dataTimeFormatter(Stime)
  let Et = dataTimeFormatter(Etime)
  let str = dataTimeFormatter(Stime, 8)
  // console.log(St, Et)
  if(status == '2') {
      return '开始时间：' + str
  }
  if (status == '4' || status == '5') {
    return '已结束'
  }
  if (status == '3') {
    return CountdownDiv(Etime, id, funs)
  }
}


/**
UI计时状态
*/
const CountdownDiv = (Etime, id, funs) => {
  let dov = 'Cod' + id
  
    setTimeout(function() {
      BackCountdown(Etime, (msg) => {
        try{
          if( typeof(funs) == 'function'){
            let Fss = msg.replace(/距离结束：/, '')
            funs(Fss)
          }
        document.getElementById(dov).innerHTML = msg
        if (msg == '已结束') {
          let underway = 'Und' + id
          let finish = 'Feg' + id
          document.getElementById(underway).style.display = 'none'
          document.getElementById(finish).style.display = 'block'
        }
        }catch(err){}
      })
    }, 1000)
  
}
/**
倒计时
*/
const BackCountdown = (Etime, fn) => {
    let timer = setInterval(function () {
       let str = getCountdown(Etime)
       if (str) {
             fn(str)
        } else {
            clearInterval(timer)
            fn('已结束')
        }
    }, 1000)
}
/**
计算倒计时
*/
const getCountdown = (Etime) => {
  // 模拟
  // let endDate = new Date(1478920271000)

  // 真实
  let endDate = new Date(Etime)
  let now = new Date()
  let ETM = endDate.getTime()
  let NOM = now.getTime()
  let leftTime = ETM - NOM
  let leftsecond = parseInt(leftTime / 1000, 10)
  // let zho=parseInt(leftsecond/(24*60*60*6))
  let day1 = Math.floor(leftsecond / (60 * 60 * 24))
  let hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600)
  let minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60)
  let second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60)
  if (ETM <= NOM) {
    return false
  }
  if (day1 <= 0) {
    return '距离结束：' + hour + '小时' + minute + '分' + second + '秒'
  } else {
    return '距离结束：' + day1 + '天' + hour + '小时' + minute + '分' + second + '秒'
  }
}

/**
首页左上角状态
*/
// export const isState = (Stime, Etime) => {
export const isState = (status) => {
  // let Now = Math.round(new Date().getTime())
  // let Nt = dataTimeFormatter(Now)
  // let St = dataTimeFormatter(Stime)
  // let Et = dataTimeFormatter(Etime)
  if (status == '2') {
    return 'begin'
  }
  if (status == '4' || status == '5') {
    return 'finish'
  }
  if (status == '3') {
    return 'underway'
  }
}
