import React, { Component } from 'react';
import ArticleList from './articleList';
import About from './about';
import Slideright from './slideRight';

class Index extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className="content">
            12
            <ArticleList/>
            <Slideright/>
            </div>
        )
    }
}
export default Index;