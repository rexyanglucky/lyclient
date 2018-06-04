import Index from '@/components/index/App'
import Manage from '@/containers/manage';
import Article from '@/components/article/App';
// import Add from '@/containers/add';
import { getArticleListAsync,getArticleDetialAsync  } from '../actions/article';
const router=[
    {
        path:'/',
        component:Index,
        default:true,
        initFunc:getArticleListAsync,
        index:"../index/index.html"
    },
    {
        path:'/manage',
        component:Manage,
        initFunc:getArticleListAsync,
        index:"../manage/manage.html"
    },
    {
        path:'/manage/add',
        component:null,
        initFunc:null,
        noServerRender:true,
        index:"../manage/manage.html"
    },
    {
        path:'/manage/add/:id',
        component:null,
        initFunc:null,
        noServerRender:true,
        index:"../manage/manage.html"
    },
    {
        path:'/article/:id',
        component:Article,
        initFunc:getArticleDetialAsync,
        index:"../article.html"
    },
    {
        path:'/index',
        component:Manage,
        redirect:'/'
    },


]

export default router;