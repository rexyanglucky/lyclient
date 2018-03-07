import React, { Component } from 'react';
import ArticleItem from './articleItem';
import config from '@/config';
import axios from 'axios';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        const {articleList}=props;
        this.state = { articleList: articleList }
    }
    componentDidMount() {
        // let self = this;
        // axios.get(config.url + "/article/list").then((response) => {
        //     if (response.data) {
        //         let data = response.data.data;
        //         self.setState({ articleList: data });
        //     }
        // });
      
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