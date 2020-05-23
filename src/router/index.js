import Home from '../views/home'

import Register from '../views/user/register'
import UserCenter from '../views/user/center'
import Agreement from '../views/user/agreement'


import Appoint_Detail from '../views/appoint/detail'
import Appoint_History from '../views/appoint/history'
import MyAppoint from '../views/appoint/myAppoint'
import Select_Date from '../views/appoint/selectDate'
import Setting from '../views/user/setting'
import EmergencyPerson from '../views/user/setting/emergencyPerson.js'
import Modifypass from '../views/user/modifypass'

import Therapist_Search from '../views/therapist/search'
import Therapist_Detail from '../views/therapist/detail'


import Push_Appointment_Detail from '../views/push/appointmentDetail'
import AcceptAppointment from '../views/push/acceptAppointment'


import Error from '../views/error'
import Auth from '../views/auth'

import Order_List from '../views/order/list'


export {Error,Home,Register,UserCenter,Appoint_History,MyAppoint,Appoint_Detail,Select_Date,Setting,EmergencyPerson,Modifypass,
    Therapist_Search,Therapist_Detail,Agreement,Auth,Order_List}


const routers = [
    {path: '/', component: Home},
    {path: '/user/register', component: Register},
    {path: '/user/center', component: UserCenter},
    {path: '/user/setting', component: Setting},
    {path: '/user/setting/emergencyPerson', component: EmergencyPerson},
    {path: '/user/modifypass', component: Modifypass},
    {path: '/user/agreement', component: Agreement},


    {path: '/therapist/search', component: Therapist_Search},
    {path: '/therapist/detail', component: Therapist_Detail},


    {path: '/appoint/detail', component: Appoint_Detail},
    {path: '/appoint/history', component: Appoint_History},
    {path: '/appoint/myAppoint', component: MyAppoint},
    {path: '/appoint/selectDate', component: Select_Date},

    {path: '/push/appointmentDetail', component: Push_Appointment_Detail},
    {path: '/push/acceptAppointment', component: AcceptAppointment},

    {path: '/order/list', component: Order_List},


]

export default routers;
