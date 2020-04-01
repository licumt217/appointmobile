import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    //防止页面刷新状态丢失
    isLogin:sessionStorage.getItem("isLogin")==='true'?true:false,
    user_id:sessionStorage.getItem("user_id")||'',
    message:sessionStorage.getItem("message")||'',
    activeMenuName:sessionStorage.getItem("activeMenuName")||'1-1',
    username:sessionStorage.getItem("username")||'',
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{},
    menuList:sessionStorage.getItem("menuList")?JSON.parse(sessionStorage.getItem("menuList")):[],
    titleList:sessionStorage.getItem("titleList")?JSON.parse(sessionStorage.getItem("titleList")):[]
}

const getters={
    isLogin:(state)=>{


        return sessionStorage.getItem("isLogin")==='yes';
    },
    user_id:(state)=>{

        return sessionStorage.getItem("user_id")||'';
    },
    message:(state)=>{

        return sessionStorage.getItem("message")||'';
    },

}

const mutations={
    message:(state,value)=>{
        sessionStorage.setItem("message",value)
        state.message=value
    },
    isLogin:(state,value)=>{
        sessionStorage.setItem("isLogin",value)
        state.isLogin=value
    },
    user_id:(state,value)=>{
        sessionStorage.setItem("user_id",value)
        state.user_id=value
    },
    username:(state,value)=>{
        sessionStorage.setItem("username",value)
        state.username=value
    },
    activeMenuName:(state,value)=>{
        sessionStorage.setItem("activeMenuName",value)
        state.activeMenuName=value
    },
    userInfo:(state,value)=>{
        sessionStorage.setItem("userInfo",JSON.stringify(value))
        state.userInfo=value
    },
    menuList:(state,value)=>{
        sessionStorage.setItem("menuList",JSON.stringify(value))
        state.menuList=value
    },
    titleList:(state,value)=>{
        sessionStorage.setItem("titleList",JSON.stringify(value))
        state.titleList=value
    },
    reset(state){
        for(let key in state){
            state[key]=undefined;
        }

        let keyArray=['isLogin','user_id','activeMenuName','username','userInfo','menuList']

        keyArray.forEach((key)=>{
            sessionStorage.removeItem(key)
        })
    }
}

export default new Vuex.Store({state,getters,mutations})
