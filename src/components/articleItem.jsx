import React, { Component } from 'react';
import ArticleItemMsg from './articleItemMsg.jsx';
class ArticleItem extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <li className="item">
                <div className="left">
                    <p className="author">{this.props.article.author} <span className="item-time">3 小时前</span></p>
                    <a href="ac00001.html">
                        <p className="title">{this.props.article.title}</p>
                    </a>
                    <p className="article">{this.props.article.content}</p>
                    <ArticleItemMsg  />
                </div>
                <div className="right">
                    <img src="img/teacher1.jpg" alt="别山举水" data-realsrc="img/teacher1.jpg" />
                </div>
            </li>
        );
    }
}
export default ArticleItem;