import axios from 'axios';
import config from '@/config';
export function getArticleList(callback) {
    axios.get(config.url + "/article/list").then((response) => {
        if (response.data) {
            let data = response.data.data;
            callback && callback(data);
        }
        else {
        }
    });
}
export function getArticleDetial(id, callback) {
    axios.get(config.url + "/article/detial", { params: { id: id } }).then((response) => {
        if (response.data) {
            let data = response.data.data;
            if (data.length > 0) {
                callback && callback(data[0])
            }
            else {
                callback && callback()
            }
        }
        else {
            callback && callback();
        }
    }).catch(msg => { callback && callback(); });;
}
const fetch = (url, data, method) => {
    let obj = { url:config.url+url, method: method || 'post', data };
    return axios.request(obj);
}
// const getArticleList = (param) => fetch("/article/list",param,"get");
// const getArticleDetial = (param) => fetch("/article/detial",param,"get");
export const publicArticle = (data) => fetch("/article/public",data,"");
