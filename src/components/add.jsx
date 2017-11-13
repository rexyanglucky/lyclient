import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import '../css/about.css';
class Add extends Component {
    /**
     * 保存文章
     */
    saveArticle(){
        let self=this;
        alert(1);
        axios.post(config.url + "/article/add",{}).then((response) => {
            // console.log(response);
            if (response.data) {
                let data = response.data.data;
                console.log(data);
                self.setState({ articleList: data });
            }
        });
    }
    render() {
        return (
            <div>
                <textarea></textarea>
                <input type="button" value="保存" onClick={this.saveArticle}/>
            </div>
        )
    }
}
export default Add;