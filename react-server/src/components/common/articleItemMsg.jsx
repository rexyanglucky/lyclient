import React, { Component } from 'react';
class ArticleItemMsg extends Component {
    constructor(props) {
        super(props);
        let { article } = props;
        this.article = article;
    }
    render() {
        return (
            // <p></p>
            <p className="msg">
                <span className="type field-item">
                    <span className="item-label">分类：</span>
                    <span className="item-value">{this.article.categoryName?this.article.categoryName:'其它'}</span>
                </span>
                <span className="read field-item">
                    <span className="item-label">阅读：</span>
                    <span className="item-value">{this.article.vcount?this.article.vcount:0}</span>
                </span>
            </p>
        )
    }
}
export default ArticleItemMsg;