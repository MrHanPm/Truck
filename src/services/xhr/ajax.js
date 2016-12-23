import { errHandler } from './config'

const xhr = ({ url, type = 'GET', body = null}) => { 
    var setting = { 
        url: url,
        type: type,
        data: body,
        async: true, // true为异步请求。如果同步请求 false
        dataType: 'json'
    }
    var aData = [] // 存储数据
    var sData = '' // 拼接数据

    for (var attr in setting.data) { 
        aData.push(attr + '=' + filter(setting.data[attr]))
    }
    sData = aData.join('&')
    setting.type = setting.type.toUpperCase()

    var promise = new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest()
        try { 
            if (setting.type == 'GET') {  // get方式请求
                if (setting.url.indexOf('?') > 0) { 
                    sData = setting.url + sData
                } else { 
                    sData = setting.url + '?' + sData
                }
                xhr.open(setting.type, sData + '&' + new Date().getTime(), setting.async)
                xhr.send()
            } else { 
                xhr.open(setting.type, setting.url, setting.async)
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                xhr.send(sData)
            }
        } catch (e) { 
            return this.httpEnd()
        }

        if (setting.async) { 
            xhr.addEventListener('readystatechange', httpEnd, false)
        } else { 
            this.httpEnd()
        }

        function httpEnd() { 
            if (xhr.readyState == 4) { 
                var head = xhr.getAllResponseHeaders()
                var response = xhr.responseText
                // 将服务器返回的数据，转换成json
                if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{ |\[)([\s\S])*?(\]|\})$/.test(response)) { 
                    response = JSON.parse(response)
                }
                if (xhr.status == 200) { 
                    resolve(response, setting, xhr)
                } else { 
                    reject(errHandler)
                }
            }
        }
        xhr.end = function () {
            xhr.removeEventListener('readystatechange', httpEnd, false)
        }
    })
    function filter (str) {  // 特殊字符转义
        str += ''
        str = str.replace(/%/g, '%25')
        str = str.replace(/\+/g, '%2B')
        str = str.replace(/ /g, '%20')
        str = str.replace(/\//g, '%2F')
        str = str.replace(/\?/g, '%3F')
        str = str.replace(/&/g, '%26')
        str = str.replace(/\=/g, '%3D')
        str = str.replace(/#/g, '%23')
        return str
    }
    return promise
}

export default xhr
