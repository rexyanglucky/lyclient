import { DEL_ARTICLE, GET_ARTICLE_LIST,GET_ARTICLE_DETIAL } from './actionType';
const ArticleState = {
    articleList: []
}
export function Article(state = ArticleState, action) {
    switch (action.type) {
        case GET_ARTICLE_LIST:
            return { ...state, articleList: action.articleList};
            break;
        case DEL_ARTICLE:
            break;
        case GET_ARTICLE_DETIAL:
            return {...state,articleInfo:action.articleInfo};
            break;
        default: 
            break;
    }

}
