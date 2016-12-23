// 此处配置 根访问路径 以及 全局错误处理
// 更多配置请根据业务逻辑自行实现
// console-log XHR:Failed 详情请看控制台
// 后端 API 地址，最好以 http(s):// 打头
export const HTTP = 'http://tao-yufabu.360che.com'

export const errHandler = (e) => {
  console.error(e)
  // alert('网络异常或服务器错误！')
  // window.location.href = 'http://tao-yufabu.360che.com/member'
}

