import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)



const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')

const user_login = r => require.ensure([], () => r(require('../pages/user/login')), 'user_login')
const user_register = r => require.ensure([], () => r(require('../pages/user/register')), 'user_register')
const user_operate = r => require.ensure([], () => r(require('../pages/user/operate')), 'user_operate')

const paper_list = r => require.ensure([], () => r(require('../pages/paper/list')), 'paper_list')
const paper_detail = r => require.ensure([], () => r(require('../pages/paper/detail')), 'paper_detail')

const report_list = r => require.ensure([], () => r(require('../pages/report/list')), 'report_list')
const report_detail = r => require.ensure([], () => r(require('../pages/report/detail')), 'report_detail')






const router=new VueRouter({
    base:'questionmobile',
    // mode:'history',
    routes:[
        // {
        //     path:'/',
        //     component:homepage
        // },

        //user
        {
            path:'/user/login',
            component:user_login
        },{
            path:'/user/register',
            component:user_register
        },{
            path:'/user/operate',
            component:user_operate
        },


        //问卷管理
        {
            path:'/paper/detail',
            component:paper_detail
        },{
            path:'/paper/list',
            component:paper_list
        },

        //报告
        {
            path:'/report/list',
            component:report_list
        },{
            path:'/report/detail',
            component:report_detail
        },



    ]
})

router.afterEach((to,from,next)=>{

    //切换路由时菜单动态跟随切换
        store.commit('activeMenuName',to.meta.activeName)

})

export default router
