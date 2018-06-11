import React, { Component } from 'react';
import ArticleItem from './articleItem';
import config from '@/config';
import axios from 'axios';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        const { articleList } = props;
        this.state = { articleList: articleList }
    }
    componentDidMount() {
        if (!this.state.articleList || this.state.articleList.length === 0) {
            this.props.getArticleListAsync();
        }
    }
    componentWillReceiveProps(props) {
        const self = this;
        const { articleList } = props;
        self.setState({ articleList: articleList });
    }

    render() {
        if (!this.state.articleList || this.state.articleList.length === 0) {
            return <p>暂无文章呢，快去添加吧</p>
        }
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