import Index from '@/components/index/App'
import Manage from '@/containers/manage';
import Article from '@/components/article/App';
import { getArticleListAsync,getArticleDetialAsync  } from '../actions/article';
const router=[
    {
        path:'/',
        component:Index,
        default:true,
        initFunc:getArticleListAsync
    },
    {
        path:'/manage',
        component:Manage,
        initFunc:getArticleListAsync
    },
    {
        path:'/article/:id',
        component:Article,
        initFunc:getArticleDetialAsync
    },
    {
        path:'/index',
        component:Manage,
        redirect:'/'
    },


]

export default router;