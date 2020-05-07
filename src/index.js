import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import VConsole from 'vconsole';
import {Provider} from 'react-redux'

import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./store";


if (process.env.OUR_NODE_ENV !== 'prod') {
    new VConsole();
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
    ,
    document.getElementById('root')
);

