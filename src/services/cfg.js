export const getWxConfig = {
    get:function(){
        let jsSDK = JSON.parse(localStorage.getItem('jsSDK'));
        if(jsSDK !== null){
            let json = {debug:false,appId:jsSDK.appId,timestamp:jsSDK.timestamp,nonceStr:jsSDK.nonceStr,signature:jsSDK.signature,jsApiList: ['hideOptionMenu','showOptionMenu','closeWindow','onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',]};
            return json;
        }else{
            return {debug:false,appId:'',timestamp:'',nonceStr:'',signature:'',jsApiList: ['hideOptionMenu','showOptionMenu','closeWindow','onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',]};
        }
    }
}

/*本地存储数据名称表(Tool.localItem)

SESSIONID
USERINFO
CITYID   城市id
*/

