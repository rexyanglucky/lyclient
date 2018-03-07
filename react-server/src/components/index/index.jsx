import React, { Component } from 'react';
import ArticleList from '@/containers/common/articleList';
import Slideright from './slideRight';
import '@/css/index';
class Index extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className="content">
            <ArticleList/>
            <Slideright/>
            </div>
        )
    }
}
export default Index;