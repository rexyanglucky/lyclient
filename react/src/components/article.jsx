import React, { Component } from 'react'
import config from '../config';
import axios from 'axios';
import '../css/article.css';
import marked from 'marked'
import highlight from 'highlight.js'
import '../../../node_modules/highlight.js/styles/atelier-cave-dark.css';
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleInfo: {}
        }
    }
    componentDidMount() {
        let self = this;
        let id = self.getQueryParam("id");
        axios.get(config.url + "/article/detial", { params: { id: id } }).then((response) => {
            if (response.data) {
                let data = response.data.data;
                if (data.length > 0) {
                    self.setState({ articleInfo: data[0] });
                }

            }
        });
    }
    getQueryParam(name) {
        let search = window.location.search;
        var pattern = /(\w+)=(\w+)/ig;
        let param = {};
        search.replace(pattern, function (rs, $1, $2, offset, source) {
            param[$1] = $2;
        })
        if (param.hasOwnProperty(name)) {
            return param[name];
        }
        return '';

    }

    render() {
        let { articleInfo } = this.state;
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
                        return highlight.highlightAuto(code).value;
                    }
                });
        }
        return (
            <div className="article_content">
                <div className="p-header">{articleInfo.title}</div>
                <div className="p-author">By {articleInfo.author} {articleInfo.createTime}</div>
                <div className="p-second-header"></div>
                <div className="p-content">
                    <img src="img/2017-07-07-01.jpg" alt="" title="笑的真甜" className="w100" />
                    <div dangerouslySetInnerHTML={{
                        __html: contentHtml
                    }}></div>
                </div>
                <div className="msg"></div>
            </div>
        )
    }

}
export default Article;