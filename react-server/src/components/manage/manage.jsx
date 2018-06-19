import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link,
} from 'react-router-dom'
import ArticleItem from '@/components/common/articleItem';
import config from '@/config';
import axios from 'axios';
import { connect } from 'react-redux'
import lazyLoad from '../common/lui/lazyLoad';
import '@/css/index';
import '@/css/manage';
class Manage extends Component {
    constructor(props) {
        super(props);
        const {articleList}=props;
        this.state = {
            articleList: articleList,
            redirectToAdd: false
        }
        this.redirectAdd = this.redirectAdd.bind(this);
    }
    componentDidMount() {
        let self = this;
        if (!self.state.articleList || self.state.articleList.length === 0) {
            self.props.getArticleListAsync();
        } else{
            lazyLoad();
        }
    }
    componentWillReceiveProps(props){
        const self = this;
        const { articleList } = props;
        self.setState({ articleList: articleList },()=>{lazyLoad()});
    }
    delArticle(id) {
        let self = this;
        axios.post(config.url + "/article/delete", { id: id }).then((response) => {
            if (response.data) {
                let list = self.state.articleList;
                let r = list.filter((item, index, arr) => {
                    if (item._id != id) {
                        return item;
                    }
                })
                self.setState({ articleList: r });

            }
        });
    }
    editArticle(id) {
        this.props.history.push(`/manage/add/${id}`);
    }
    redirectAdd() {
        this.props.history.push('/manage/add');
        // this.setState({ redirectToAdd: true })
    }
    render() {
        
        return (
            
            <div className="content">
                <p>
                    <span className="btn_add" onClick={this.redirectAdd}>Add New +</span>
                    <a className="btn_add" href="/">预览首页</a>
                </p>
                {/* {this.state.redirectToAdd && (<Redirect to={'/add'} />)} */}
                <ul className="article-list">
                    {
                        this.state.articleList.map(item => {
                            if (item) {
                                return (<div key={item._id}>
                                    <ArticleItem article={item} />
                                    <div className='op'>
                                        <span className='btn' onClick={this.delArticle.bind(this, item._id)}>删除</span>
                                        <span className='btn' onClick={this.editArticle.bind(this, item._id)}>编辑</span> </div>
                                    {item._id}
                                </div>);
                            }
                        })
                    }

                </ul>
            </div>
        )
    }
}

Manage.propTypes = {
    articleList: PropTypes.array.isRequired,

}


export default Manage;

