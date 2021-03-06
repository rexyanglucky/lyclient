import React, { Component } from 'react';
import '../css/about.css';
class About extends Component {
    render() {
        return (
            <div className='about_content'>
                <div className="info">
                    <div className="warp">
                        <div className="logo"></div>
                        <div className="text">
                    <p>作为一名程序员，整天比较忙，陪伴在孩子的身边少，心里甚是愧欠，因此有心记录孩子的的瞬间，也是一种思念的方式。</p>
                    <p>另外也可等孩子长大后，以供翻阅。</p>
                    <p>以孩子名字注册域名，会写一些关于一家人的点滴随笔。</p>
                    <p>仅此而已，若您不经意浏览到此小站，请善意对待。</p>
                </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default About;