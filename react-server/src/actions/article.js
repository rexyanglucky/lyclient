import {DEL_ARTICLE,GET_ARTICLE_LIST} from '../actionType';
export function delArticle(id) {
    return { type: DEL_ARTICLE, id }
}
export function getArticleList(articleList) {
    return { type: GET_ARTICLE_LIST,articleList:articleList}
}