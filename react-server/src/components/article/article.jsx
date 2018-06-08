import React, { Component } from 'react'
import config from '@/config';
import axios from 'axios';
import '@/css/article.css';
import marked from 'marked'
// import highlight from 'highlight.js'
// import '../../../../node_modules/simplemde/dist/simplemde.min.css';
// import '../../../../node_modules/highlight.js/styles/atelier-cave-dark.css';
class Article extends Component {
    constructor(props) {
        super(props);
        const {articleInfo}=props;
        this.state = {
            articleInfo: articleInfo
        }
    }
    componentDidMount() {
        // let self = this;
        // let id = self.getQueryParam("id");
        // axios.get(config.url + "/article/detial", { params: { id: id } }).then((response) => {
        //     if (response.data) {
        //         let data = response.data.data;
        //         if (data.length > 0) {
        //             self.setState({ articleInfo: data[0] });
        //         }
        //     }
        // });
    }
    getQueryParam(name) {
        // let search = window.location.search;
        // var pattern = /(\w+)=(\w+)/ig;
        // let param = {};
        // search.replace(pattern, function (rs, $1, $2, offset, source) {
        //     param[$1] = $2;
        // })
        // if (param.hasOwnProperty(name)) {
        //     return param[name];
        // }
        // return '';

    }

    render() {

        let articleInfo = this.state.articleInfo;
        if(!articleInfo){
            return <p>文章找不到了。。。</p>
        }
        let contentHtml = '';
        if (articleInfo.content) {
            contentHtml = marked(articleInfo.content,
                {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        // return highlight.highlightAuto(code).value;
                        return code;
                    }
                });
        }
        return (
            <div className="article_content">
            <link rel="stylesheet" href="/static/markdownstyle/markdown.css"/>
            <link rel="stylesheet" href="/static/markdownstyle/haroopad/haroopad.css"/>
                <div className="p-header">{articleInfo.title}</div>
                {articleInfo.author ? <div className="p-author">By {articleInfo.author} {articleInfo.createTime}</div> : ''}
                <div className="p-second-header"></div>
                <div className="p-content">
                    {
                        articleInfo.headImg ? <img src={`${config.cdnurl}${articleInfo.headImg}`} alt="" title={articleInfo.headImgInfo} className="w100" /> : ''
                    }
                    {
                        <div className={(!articleInfo.isMD||articleInfo.isMD==='false'||articleInfo.isMD=='undefined')? '':'markdown haroopad '} dangerouslySetInnerHTML={{
                            __html: contentHtml
                        }}></div>
                }
                </div>
                <div className="msg"></div>
            </div>
        )
    }

}
export default Article;