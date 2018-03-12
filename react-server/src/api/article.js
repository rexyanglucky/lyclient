import axios from 'axios';
import config from '@/config';
function getArticleList(callback){
    axios.get('https:'+config.url + "/article/list").then((response) => {
        if (response.data) {
            let data = response.data.data;
            // self.setState({ articleList: data });
            callback&&callback(data);
        }
        else{
            // callback&&callback();
        }
    });
}
function getArticleDetial(id,callback){
    axios.get('https:'+config.url + "/article/detial", { params: { id: id } }).then((response) => {
        if (response.data) {
            let data = response.data.data;
            if (data.length > 0) {
                // self.setState({ articleInfo: data[0] });
                callback&&callback(data[0])
            }
            else{
                callback&&callback()
            }
        }
        else{
            callback&&callback();
        }
    }).catch(msg=>{callback&&callback();});;
}
export default {
    getArticleList,getArticleDetial
}