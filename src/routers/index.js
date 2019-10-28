import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)



const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')

const user_register = r => require.ensure([], () => r(require('../pages/user/register')), 'user_register')
const user_preTable = r => require.ensure([], () => r(require('../pages/user/preTable')), 'user_preTable')
const myAppoint = r => require.ensure([], () => r(require('../pages/myAppoint')), 'myAppoint')
const appointDetail = r => require.ensure([], () => r(require('../pages/appointDetail')), 'appointDetail')
const appointType = r => require.ensure([], () => r(require('../pages/appointType')), 'appointType')
const therapistList = r => require.ensure([], () => r(require('../pages/therapistList')), 'therapistList')
const therapistListWithTransfer = r => require.ensure([], () => r(require('../pages/therapistListWithTransfer')), 'therapistListWithTransfer')
const therapistDetail = r => require.ensure([], () => r(require('../pages/therapistDetail')), 'therapistDetail')
const appointTime = r => require.ensure([], () => r(require('../pages/appointTime')), 'appointTime')
const userFeedbackPush = r => require.ensure([], () => r(require('../pages/push/user/feedback')), 'userFeedbackPush')
const userRoomAgreePush = r => require.ensure([], () => r(require('../pages/push/user/roomAgree')), 'userRoomAgreePush')
const caseManagerRoomConfirmPush = r => require.ensure([], () => r(require('../pages/push/caseManager/roomConfirm')), 'caseManagerRoomConfirmPush')
const therapistRoomAgreePush = r => require.ensure([], () => r(require('../pages/push/therapist/roomAgree')), 'therapistRoomAgreePush')
const therapistRoomDenyPush = r => require.ensure([], () => r(require('../pages/push/therapist/roomDeny')), 'therapistRoomDenyPush')



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
        },{
            path:'/appointType',
            component:appointType
        },{
            path:'/therapistList',
            component:therapistList
        },{
            path:'/therapistListWithTransfer',
            component:therapistListWithTransfer
        },{
            path:'/therapistDetail',
            component:therapistDetail
        },
        {
            path:'/appointTime',
            component:appointTime
        },
        {
            path:'/userFeedbackPush',
            component:userFeedbackPush
        },{
            path:'/userRoomAgreePush',
            component:userRoomAgreePush
        },{
            path:'/caseManagerRoomConfirmPush',
            component:caseManagerRoomConfirmPush
        },{
            path:'/therapistRoomAgreePush',
            component:therapistRoomAgreePush
        },{
            path:'/therapistRoomDenyPush',
            component:therapistRoomDenyPush
        },



    ]
})

router.afterEach((to,from,next)=>{

    //切换路由时菜单动态跟随切换
        store.commit('activeMenuName',to.meta.activeName)

})

export default router
