import {DEL_ARTICLE,GET_ARTICLE_LIST,GET_ARTICLE_DETIAL,GET_ARTICLE_LIST_ASYNC,GET_ARTICLE_DETIAL_ASYNC,GET_ARTICLE_LIST_PRE} from '../actionType';
import axios from 'axios';
import config from '@/config';
export function delArticle(id) {
    return { type: DEL_ARTICLE, id }
}
//开始请求数据列表
export function PreLoading(){
    return {type:GET_ARTICLE_LIST_PRE}
}
export function getArticleList(articleList) {
    return { type: GET_ARTICLE_LIST,articleList:articleList}
}
export function getArticleDetial(articleInfo) {
    return { type: GET_ARTICLE_DETIAL,articleInfo:articleInfo}
}


export function getArticleListAsync(){
    return function(dispatch){
        dispatch(PreLoading());
        return axios.get('https:'+config.url + "/article/list").then((response) => {
                let data = response.data.data;
                dispatch(getArticleList(data));
        });
    }
}

export function getArticleDetialAsync({id='5a9623a0d9d5d150626ac566'}){
    return function(dispatch){
        dispatch(PreLoading());
        return axios.get('https:'+config.url + "/article/detial", { params: { id: id } }).then((response) => {
                let data = response.data.data;
                data.length > 0? dispatch(getArticleDetial(data[0])):dispatch(getArticleDetial());
        });
    }
}