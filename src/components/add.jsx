import React, { Component } from 'react';
import '../css/about.css';
class Add extends Component {
    /**
     * 保存文章
     */
    saveArticle(){
        alert(1);
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