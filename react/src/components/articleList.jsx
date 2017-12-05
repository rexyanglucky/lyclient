import React, { Component } from 'react';
import ArticleItem from './articleItem';
import config from '../config';
import axios from 'axios';

class ArticleList extends Component {
    constructor() {
        super();
        this.state = { articleList: [] }
    }
    componentDidMount() {
        let self = this;
        axios.get(config.url + "/article/list").then((response) => {
            // console.log(response);
            if (response.data) {
                let data = response.data.data;
                console.log(data);
                self.setState({ articleList: data });
            }
        });
    }
    render() {
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