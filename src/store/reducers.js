import {combineReducers} from "redux";

const login = (state = false, action) => {
    if(action.type==='login'){
        return action.payload||false;
    }else{
        return state;
    }

};

const user_id = (state = '', action) => {
    if(action.type==='user_id'){
        return action.payload;
    }else{
        return state;
    }
};

const menu_selected_index = (state = '', action) => {
    if(action.type==='menu_selected_index'){
        return action.payload;
    }else{
        return state;
    }
};

const openid = (state = '', action) => {
    if(action.type==='openid'){
        return action.payload;
    }else{
        return state;
    }
};

const token = (state = '', action) => {
    if(action.type==='token'){
        return action.payload;
    }else{
        return state;
    }
};

const role = (state = 4, action) => {
    if(action.type==='role'){
        return action.payload;
    }else{
        return state;
    }
};





let reducers=combineReducers({
    login,
    openid,
    user_id,
    role,
    token,
    menu_selected_index
})

export default reducers;
