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
const continueTime = r => require.ensure([], () => r(require('../pages/continueTime')), 'continueTime')
const selectRoom = r => require.ensure([], () => r(require('../pages/selectRoom')), 'selectRoom')

const userFeedbackPush = r => require.ensure([], () => r(require('../pages/push/user/feedback')), 'userFeedbackPush')
const userRoomAgreePush = r => require.ensure([], () => r(require('../pages/push/user/roomAgree')), 'userRoomAgreePush')
const userAppointDenyPush = r => require.ensure([], () => r(require('../pages/push/user/appointDeny')), 'userAppointDenyPush')
const userAppointAgreePush = r => require.ensure([], () => r(require('../pages/push/user/appointAgree')), 'userAppointAgreePush')

const caseManagerRoomConfirmPush = r => require.ensure([], () => r(require('../pages/push/caseManager/roomConfirm')), 'caseManagerRoomConfirmPush')

const therapistRoomAgreePush = r => require.ensure([], () => r(require('../pages/push/therapist/roomAgree')), 'therapistRoomAgreePush')
const therapistRoomDenyPush = r => require.ensure([], () => r(require('../pages/push/therapist/roomDeny')), 'therapistRoomDenyPush')
const therapistAppointConfirmPush = r => require.ensure([], () => r(require('../pages/push/therapist/appointConfirm')), 'therapistAppointConfirmPush')
const therapistAppointFinishConfirmPush = r => require.ensure([], () => r(require('../pages/push/therapist/appointFinishConfirm')), 'therapistAppointFinishConfirmPush')
const therapistEmergencyAppointPush = r => require.ensure([], () => r(require('../pages/push/therapist/emergencyAppoint')), 'therapistEmergencyAppointPush')
const therapistPaySuccessPush = r => require.ensure([], () => r(require('../pages/push/therapist/paySuccess')), 'therapistPaySuccessPush')




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
            path:'/continueTime',
            component:continueTime
        },
        {
            path:'/selectRoom',
            component:selectRoom
        },


        {
            path:'/userFeedbackPush',
            component:userFeedbackPush
        },{
            path:'/userRoomAgreePush',
            component:userRoomAgreePush
        },{
            path:'/userAppointDenyPush',
            component:userAppointDenyPush
        },{
            path:'/userAppointAgreePush',
            component:userAppointAgreePush
        },


        {
            path:'/caseManagerRoomConfirmPush',
            component:caseManagerRoomConfirmPush
        },{
            path:'/therapistRoomAgreePush',
            component:therapistRoomAgreePush
        },{
            path:'/therapistRoomDenyPush',
            component:therapistRoomDenyPush
        },{
            path:'/therapistAppointConfirmPush',
            component:therapistAppointConfirmPush
        },{
            path:'/therapistAppointFinishConfirmPush',
            component:therapistAppointFinishConfirmPush
        },{
            path:'/therapistEmergencyAppointPush',
            component:therapistEmergencyAppointPush
        },{
            path:'/therapistPaySuccessPush',
            component:therapistPaySuccessPush
        },



    ]
})

router.afterEach((to,from,next)=>{

    //切换路由时菜单动态跟随切换
        store.commit('activeMenuName',to.meta.activeName)

})

export default router
