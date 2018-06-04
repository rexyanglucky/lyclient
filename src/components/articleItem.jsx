import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
    // Switch
} from 'react-router-dom'
import ArticleItemMsg from './articleItemMsg.jsx';
class ArticleItem extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <Link to={{ pathname: '/article', query: { id:this.props.article._id },search:`id=${this.props.article._id}` }}>
                <li className="item">
                    <div className="left">
                        <p className="author">{this.props.article.author} <span className="item-time">3 小时前</span></p>

                           <p className="title">{this.props.article.title}</p>
                        <p className="article">{this.props.article.content}</p>
                        <ArticleItemMsg />
                    </div>
                    <div className="right">
                        <img src="img/teacher1.jpg" alt="别山举水" data-realsrc="img/teacher1.jpg" />
                    </div>
                </li>
            </Link>
        );
    }
}
export default ArticleItem;