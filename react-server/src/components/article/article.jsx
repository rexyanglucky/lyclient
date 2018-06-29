import React, { Component } from 'react'
import config from '@/config';
import axios from 'axios';
import '@/css/article.css';
import marked from 'marked'
// import highlight from 'highlight.js'
// import '../../../../node_modules/highlight.js/styles/atelier-cave-dark.css';
class Article extends Component {
    constructor(props) {
        super(props);
        const {articleInfo,match}=props;
        this.aritcleId=(match && match.params && match.params.id) ? match.params.id : '';
        this.state = {
            articleInfo: articleInfo
        }
    }
    componentDidMount() {
        if (!this.state.articleInfo&&this.aritcleId) {
            this.props.getArticleDetialAsync({id : this.aritcleId});
        }
    }
    componentWillReceiveProps(props) {
        const self = this;
        const { articleInfo } = props;
        self.setState({ articleInfo: articleInfo });
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
        if (articleInfo.content && articleInfo.isMD && articleInfo.isMD!="false") {
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
        } else {
            contentHtml = articleInfo.content;
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