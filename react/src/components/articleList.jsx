import React, { Component } from 'react';
import ArticleItem from './articleItem';
import config from '../config';
import axios from 'axios';

class ArticleList extends Component {
    constructor() {
        super();
        this.state = { articleList: [] }
    }
    componentDidMount() {
        let self = this;
        axios.get(config.url + "/article/list").then((response) => {
            if (response.data) {
                let data = response.data.data;
                self.setState({ articleList: data });
            }
        });
        let url = window.location.href;
        
        axios.post(config.url + "/token/getshareconfig", { url: url }).then((response) => {
            if (response.data) {
                let data = response.data.data;

                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
        wx.onMenuShareTimeline({
            title: '梁语小站', // 分享标题
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://www.yangliangyu.com/static/img/logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('分享成功');
            },
            cancel: function () {
                alert('分享取消');
            }
        })
    }

    render() {
        return (<ul className="article-list">
            {
                this.state.articleList.map(item => {
                    if (item) {
                        return <ArticleItem key={item._id} article={item} />
                    }
                })
            }


        </ul>
        )
    }
}


export default ArticleList;