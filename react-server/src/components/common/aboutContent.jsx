import React, { Component } from 'react';

const AboutContent = (props) => {
  return (
    <div className="info">
      <div className="warp">
        <div className="logo"></div>
        <div className="text">
          {/* <p>作为一名程序员，整天比较忙，陪伴在孩子的身边少，心里甚是愧欠，因此有心记录孩子的的瞬间，也是一种思念的方式。</p> */}
          {/* <p>另外也可等孩子长大后，以供翻阅。</p> */}
          {/* <p>以孩子名字注册域名，会写一些关于一家人的点滴随笔以及工作学习记录。</p>
<p>仅此而已，若您不经意浏览到此小站，请善意对待，欢迎关于技术方面的交流沟通。</p> */}
          <p>作为一名程序员，有心记录工作学习过程中问题与总结。</p>
          <p>以孩子名字注册域名，也会写一些点滴随笔以及孩子的成长记录。</p>
          <p>也是将本站当作一片试验田，从零开始，一步一步实现功能与模块。会将了解到的技术在此实践并加以应用。</p>
          <p>后端api采用nodeJS,自己搭建的一套简单MVC架构。
          </p><p> 项目地址：
    <a className="project-link" target="_blank" href="https://github.com/rexyanglucky/lyserver">[github:lyserver]</a></p>
          <p>前端采用react+redux,首页和文章详情页采用服务端渲染。
          </p> <p> 项目地址：
    <a className="project-link" target="_blank" href="https://github.com/rexyanglucky/lyclient">[github:lyclient]</a></p>
          <p>仅此而已，若您不经意浏览到此小站，请善意对待，欢迎关于技术方面的交流沟通。</p>
          <p>邮箱：yangjin1029@163.com</p>
        </div>
      </div>
    </div>
  )
}
export default AboutContent;
