import axios from 'axios';
import config from '@/config';
function getArticleList(callback){
    axios.get('https:'+config.url + "/article/list").then((response) => {
        if (response.data) {
            let data = response.data.data;
            // self.setState({ articleList: data });
            callback&&callback(data);
        }
    });
}
export default {
    getArticleList
}