
import {createStore,combineReducers,applyMiddleware} from 'redux'

import {persistStore,persistReducer} from "redux-persist";

import storage from "redux-persist/lib/storage/session";

import {createLogger} from 'redux-logger'

import thunk from "redux-thunk";

import reducers from "./reducers";

const persistConfig={
    key:'root',
    storage
}

const persistedReducer=persistReducer(persistConfig,reducers)



const store=createStore(persistedReducer,{
},applyMiddleware(thunk,createLogger()))

const persistor=persistStore(store)

export {store,persistor}

export default store

