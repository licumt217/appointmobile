import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import VConsole from 'vconsole';
import {Provider} from 'react-redux'

import store from "./store";




store.dispatch({
    type:'plusBalance',
    payload:new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(7)
        },2000)
    })
})








console.log(22222,store)


if(process.env.OUR_NODE_ENV!=='prod'){
    new VConsole();
}

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

