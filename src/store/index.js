
import {createStore,combineReducers,applyMiddleware} from 'redux'

import {createLogger} from 'redux-logger'

import thunk from "redux-thunk";

import reducers from "./reducers";


function a() {
    return function () {

    }
}

const store=createStore(reducers,{
    islogin:true
},applyMiddleware(thunk,createLogger()))




export default store;
