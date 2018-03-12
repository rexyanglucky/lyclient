import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter,matchPath } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import express from 'express';
import ArticleApi from './api/article';
// import { getArticleList,getArticleDetial  } from './actions/article';
import { Article as ArticleReducer } from './reducers'

import routes from "./router"
var path = require('path');

var app = new express();
app.use(express.static('../'));
app.use((req, res) => {
  const context = {}
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    // if(req.url.indexOf("/article")>-1){
    //   const match = matchPath(req.url, {
    //     path: '/article/:id'
    //   })
    //   ArticleApi.getArticleDetial(match.params.id,data=>{
    //     var initStore = { articleInfo: data };
    //     var store = createStore(ArticleReducer, initStore);
    //     store.dispatch(getArticleDetial(data));
    //     renderHtml(store,context,req,res);
    //   })
    // }
    // else if(req.url.indexOf("/favicon.ico")<0){
    //   ArticleApi.getArticleList((data) => {
    //     var initStore = { articleList: data };
    //     var store = createStore(ArticleReducer, initStore);
    //     store.dispatch(getArticleList(data));
    //     renderHtml(store,context,req,res);
    //   })


      
    // }
    // else{
    //   res.write('404 not found');
    //   res.end();
    // }

    const store = createStore(
      ArticleReducer,
      applyMiddleware(
        thunkMiddleware // 允许我们 dispatch() 函数
      )
    )

    for(var k=0;k<routes.length;k++){
      var item=routes[k];
      const match = matchPath(req.url, {
        // path: '/article/:id'
        path:item.path
      })
      if(match&&match.isExact){       
        store.dispatch(item.initFunc(match.params)).then(()=>{
          renderHtml(store,context,req,res);
        })
        break;
      } 
    }
  }
})

app.listen(3000, function () {
  console.log("server start port 3000");
});
function renderHtml(store,context,req,res){
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>
  );
  const finalState = store.getState();

 
  var templateHtml='';
  if (req.url.indexOf('manage') > -1) {
    templateHtml = fs.readFileSync("../manage/manage.html", 'utf-8');
    templateHtml = templateHtml.replace("<div id=root></div>", `<div id=root>${html}</div><script>window.__INITIAL_STATE__ = ${JSON.stringify(finalState)}</script>`);
  }
  else if(req.url.indexOf('article')>-1) {
    templateHtml = fs.readFileSync("../article.html", 'utf-8');
    templateHtml = templateHtml.replace("<div id=root></div>", `<div id=root>${html}</div><script>window.__INITIAL_STATE__ = ${JSON.stringify(finalState)}</script>`);
  }
  else{
    templateHtml = fs.readFileSync("../index/index.html", 'utf-8');
    templateHtml = templateHtml.replace("<div id=root></div>", `<div id=root>${html}</div><script>window.__INITIAL_STATE__ = ${JSON.stringify(finalState)}</script>`);
  }
  res.write(templateHtml);

  res.end()
}
