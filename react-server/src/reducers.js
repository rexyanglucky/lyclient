import {DEL_ARTICLE,GET_ARTICLE_LIST,GET_ARTICLE_DETIAL,GET_ARTICLE_LIST_ASYNC,GET_ARTICLE_DETIAL_ASYNC,GET_ARTICLE_LIST_PRE} from './actionType';
const ArticleState = {
    articleList: [],
    isLoading:false
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
        case GET_ARTICLE_DETIAL_ASYNC:
            return {...state};
            break;
        case GET_ARTICLE_LIST_ASYNC:
            return { ...state};
            break;
        case GET_ARTICLE_LIST_PRE:
            return { ...state,isLoading:true};
            break;
        default: 
            return state;
            break;
    }

}

