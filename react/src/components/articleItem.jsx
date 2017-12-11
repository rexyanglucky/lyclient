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
import dateHelper from '../lib/dateFormat'
import '../../../node_modules/highlight.js/styles/atelier-cave-dark.css';
class ArticleItem extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        let article = this.props.article;
        return (
            <Link to={{ pathname: '/article', query: { id: article._id }, search: `id=${article._id}` }}>
                <li className="item">
                    <div className={article.headImg?'left w75':'left'}>
                        <p className="author">{article.author} <span className="item-time">{new Date(article.updateTime).toCustomRegString("yyyy-MM-dd HH:mm") }</span></p>
                        <p className="title">{article.title}</p>
                        {/* <p className="article" dangerouslySetInnerHTML={{
                        __html: contentHtml
                    }}></p> */}
                    <p>{article.content.replace(/<\/?.+?>/g,"")}</p>
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