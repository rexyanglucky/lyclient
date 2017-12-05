import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
    // Switch
} from 'react-router-dom'
import ArticleItemMsg from './articleItemMsg.jsx';
import marked from 'marked'
import highlight from 'highlight.js'
import '../../../node_modules/highlight.js/styles/atelier-cave-dark.css';
class ArticleItem extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        let article = this.props.article;
        let contentHtml = '';
        if (article.content) {
            try{
            contentHtml = marked(article.content,
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
            catch(ex){}
        }
        return (
            <Link to={{ pathname: '/article', query: { id: article._id }, search: `id=${article._id}` }}>
                <li className="item">
                    <div className={article.headImg?'left w75':'left'}>
                        <p className="author">{article.author} <span className="item-time">3 小时前</span></p>
                        <p className="title">{article.title}</p>
                        <p className="article" dangerouslySetInnerHTML={{
                        __html: contentHtml
                    }}></p>
                        <ArticleItemMsg />
                    </div>
                    {article.headImg && (<div className="right">
                        <img src={article.headImg} alt="别山举水" data-realsrc="img/teacher1.jpg" />
                    </div>)}
                </li>
            </Link>
        );
    }
}
export default ArticleItem;