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

CITYID  {name:'鄂尔多斯市',val:150600}
SESSIONID   84336cbcb894abee6c46e85d62fe18596b0eaa55
USERINFO    {"uid":"487992","nickname":"arui128","email":"","mobile":"13520344997"}

URL   

TRUCK
*/

