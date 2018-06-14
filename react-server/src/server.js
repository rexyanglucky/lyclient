import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
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
    res.redirect(301, context.url);
  } else {
    let flag = false;
    for (var k = 0; k < routes.length; k++) {
      var item = routes[k];
      const match = matchPath(req.url, {
        // path: '/article/:id'
        path: item.path
      })
      //noServerRender 设置路由，如果有 noServerRender 跳转到html指定的html页面，不做服务端渲染
      if (match && match.isExact && item.noServerRender) {
        flag = true;
        let templateHtml = fs.readFileSync(item.index, 'utf-8');
        res.write(templateHtml);
        res.end()
        break;
      }
      if (match && match.isExact) {
        flag = true;
        if (item.redirect) {
          // writeHead
          res.redirect(301, item.redirect);
          break;
        }
        const store = createStore(
          ArticleReducer,
          applyMiddleware(
            thunkMiddleware // 允许我们 dispatch() 函数
          )
        )
        store.dispatch(item.initFunc(match.params)).then(() => {
          renderHtml(store, context, req, res, item)
        }
        ).catch(err => {
          res.status(500).send(err);
        })
        break;
      }
    }
    if (!flag) {
      res.status(404).end();
    }
  }
})

app.listen(3000, function () {
  console.log("server start port 3000");
});
function renderHtml(store, context, req, res, item) {

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
  var templateHtml = '';
  templateHtml = fs.readFileSync(item.index, 'utf-8');
  templateHtml = templateHtml.replace("<div id=root></div>", `<div id=root>${html}</div><script>window.__INITIAL_STATE__ = ${JSON.stringify(finalState)}</script>`);
  res.write(templateHtml);

  res.end()
}
