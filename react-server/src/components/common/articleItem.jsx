import React, { Component } from 'react';
import {
    // BrowserRouter as Router,
    // Route,
    Link
    // Switch
} from 'react-router-dom'
import ArticleItemMsg from './articleItemMsg.jsx';

import dateHelper from '@/lib/dateFormat'
import config from '@/config';

class ArticleItem extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        let article = this.props.article;
        let content=article.content ? article.content.replace(/<\/?.+?>/g, "") : "";
        content=content.length>100?content.substr(0,100)+'...' : content;

        return (

                <li className="item">
                    <div className={article.headImg ? 'left w75' : 'left'}>
                        <p className="author">{article.author} <span className="item-time">{new Date(article.updateTime).toCustomRegString("yyyy-MM-dd HH:mm")}</span></p>
                        <a className="title" href={`/article/${article._id}`}>{article.title}</a>
                        <p>{content}</p>
                        <ArticleItemMsg />
                    </div>
                    {article.headImg && (<div className="right">
                        <img src={`${config.cdnurl}${article.headImg}`} alt="别山举水" data-realsrc="img/teacher1.jpg" />
                    </div>)}
                </li>
      
        );
    }
}
export default ArticleItem;