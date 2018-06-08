import axios from 'axios';
import config from '../../config';
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
if (isWeiXin()) {
    let url = window.location.href.split('#')[0];

    axios.post(config.url + "/token/getshareconfig", { url: url }).then((response) => {
        if (response.data) {
            let data = response.data.data;

            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: [
                    'checkJsApi',
                    'hideOptionMenu',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }
    });
    wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        // alert("ok");
        // alert(url);
        let shareConfig = {
            title: '梁语小站',
            link: url,
            imgUrl: 'https://www.yangliangyu.com/static/img/logo.png',
            desc: '梁语小站，分享你的故事',
            type: 'link',
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('分享成功');
            },
            cancel: function () {
                alert('分享取消');
            }

        }
        wx.onMenuShareTimeline(shareConfig);
        wx.onMenuShareAppMessage(shareConfig);
        wx.onMenuShareQQ(shareConfig);
        wx.onMenuShareWeibo(shareConfig);
        wx.onMenuShareQZone(shareConfig);
    });
}

export default {
    isWeiXin,
    alert(msg) {

    if (typeof window !== "undefined") {
      alert(msg);
    } else {
      console.log(msg);
    }

  }};
