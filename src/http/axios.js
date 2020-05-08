import axios from 'axios'
import Modal from '../components/Modal'
import qs from 'qs'
import store from "../store";
// axios 配置
let baseURL = 'http://www.zhuancaiqian.com/appoint_wx/'

if(window.location.href.includes('localhost')){
    baseURL = 'http://127.0.0.1:8350/appoint_wx/'
}
// http request 拦截器
axios.interceptors.request.use(
    config => {



        config.url = baseURL + config.url
        config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        config.headers.token = store.getState().token;

        let commonObj={
            openid:store.getState().openid,
            user_id:store.getState().user_id,

        }

        config.data=Object.assign(commonObj,config.data);

        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {

        if(response.data.isSuccess==="2"){
            // store.commit("reset")
            //
            // location.href=location.href.split("#")[0]+"#"+"/user/login"

            return Promise.reject(response.data.errorMsg);
        }else if(response.data.isSuccess==="1"){
            return Promise.reject(response.data.errorMsg);
        }else if(response.data.isSuccess==="0"){
            return Promise.resolve(response.data.data);
        }
    },
    error => {
        let errorMsg="请求异常"
        if(error.message && error.message==='Network Error'){
            errorMsg="网络异常"
        }else if(error.response.status===404){
            errorMsg="请求地址不存在"
        }


        return Promise.reject(errorMsg)
    }
);

export default axios;
