import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)



const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')

const user_register = r => require.ensure([], () => r(require('../pages/user/register')), 'user_register')
const user_preTable = r => require.ensure([], () => r(require('../pages/user/preTable')), 'user_preTable')
const myAppoint = r => require.ensure([], () => r(require('../pages/myAppoint')), 'myAppoint')
const appointDetail = r => require.ensure([], () => r(require('../pages/appointDetail')), 'appointDetail')

const paper_list = r => require.ensure([], () => r(require('../pages/paper/list')), 'paper_list')
const paper_detail = r => require.ensure([], () => r(require('../pages/paper/detail')), 'paper_detail')


const router=new VueRouter({
    base:'appointmobile',
    // mode:'history',
    routes:[
        {
            path:'/',
            component:user_register
        },

        {
            path:'/user/register',
            component:user_register
        },{
            path:'/user/preTable',
            component:user_preTable
        },


        {
            path:'/myAppoint',
            component:myAppoint
        },{
            path:'/appointDetail',
            component:appointDetail
        },



    ]
})

router.afterEach((to,from,next)=>{

    //切换路由时菜单动态跟随切换
        store.commit('activeMenuName',to.meta.activeName)

})

export default router
