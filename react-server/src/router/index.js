import Index from '@/components/index/App'
import Manage from '@/containers/manage';
import Article from '@/components/article/App';
const router=[
    {
        path:'/',
        component:Index,
        default:true,
    },
    {
        path:'/manage',
        component:Manage
    },
    {
        path:'/article/:id',
        component:Article
    },
    {
        path:'/index',
        component:Manage,
        redirect:'/'
    },


]

export default router;