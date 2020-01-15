import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import {Util} from '../assets/js/Util'
Vue.use(VueRouter)

import axios from '../http/axios'


const user_register             = r => require.ensure([], () => r(require('../pages/user/register')), 'user_register')
const user_preTable             = r => require.ensure([], () => r(require('../pages/user/preTable')), 'user_preTable')
const user_modifypass           = r => require.ensure([], () => r(require('../pages/user/modifypass')), 'user_modifypass')
const user_center               = r => require.ensure([], () => r(require('../pages/user/center')), 'user_center')



const appoint_myAppoint         = r => require.ensure([], () => r(require('../pages/appoint/myAppoint')), 'appoint_myAppoint')
const appoint_history           = r => require.ensure([], () => r(require('../pages/appoint/history')), 'appoint_history')
const appoint_setting           = r => require.ensure([], () => r(require('../pages/appoint/setting')), 'appoint_setting')
const appoint_detail            = r => require.ensure([], () => r(require('../pages/appoint/detail')), 'appoint_detail')



const steps_step1             = r => require.ensure([], () => r(require('../pages/steps/step1')), 'steps_step1')
const steps_step2             = r => require.ensure([], () => r(require('../pages/steps/step2')), 'steps_step2')
const steps_step3             = r => require.ensure([], () => r(require('../pages/steps/step3')), 'steps_step3')


const therapist_detail  = r => require.ensure([], () => r(require('../pages/therapist/detail')), 'therapist_detail')






const therapistListWithTransfer = r => require.ensure([], () => r(require('../pages/therapistListWithTransfer')), 'therapistListWithTransfer')
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
const pay = r => require.ensure([], () => r(require('../pages/pay')), 'pay')




const router=new VueRouter({
    base:'appointmobile',
    mode:'history',
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
        },{
            path:'/user/modifypass',
            component:user_modifypass
        },{
            path:'/user/center',
            component:user_center
        },




        {
            path:'/appoint/myAppoint',
            component:appoint_myAppoint
        },{
            path:'/appoint/history',
            component:appoint_history
        },{
            path:'/appoint/setting',
            component:appoint_setting
        },{
            path:'/appoint/detail',
            component:appoint_detail
        },



        {
            path:'/steps/step1',
            component:steps_step1
        },{
            path:'/steps/step2',
            component:steps_step2
        },{
            path:'/steps/step3',
            component:steps_step3
        },


        {
            path:'/therapist/detail',
            component:therapist_detail
        },




        {
            path:'/therapistListWithTransfer',
            component:therapistListWithTransfer
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


        {
            path:'/pay',
            component:pay
        },



    ]
})

router.beforeEach((to,from,next)=>{

    //验证openid是否和手机号绑定了

    if(sessionStorage.user_id){
        next()
    }else{

        if(sessionStorage.openid){

            if(to.path==='/user/register'){
                next()
            }else{
                next('/user/register')
            }


        }else{
            let code =Util.getUrlParam("code")

            if(!code){
                console.error("授权code不能为空!")
            }else{
                axios.get('wechatApi/getOpenid', {
                    params:{
                        code:code
                    }
                }).then((openid) => {

                    sessionStorage.openid=openid;
                    axios.get('login/getUserByOpenid', {
                        params:{
                            openid
                        }
                    }).then((data) => {
                        if(data){
                            sessionStorage.user_id=data.userInfo.user_id
                            sessionStorage.token=data.token
                            store.commit('isLogin', true)
                            next()
                        }else{
                            next('/user/register')
                        }

                    }).catch(err => {
                        this.$Message.error(err)
                    })

                }).catch(err => {
                    this.$Message.error(err)
                })
            }


        }


    }




})

export default router
