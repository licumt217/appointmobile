import {combineReducers} from "redux";

const islogin = (state = false, action) => {
    if(action.type==='login'){
        return true;
    }else if(action.type==='logout'){
        return false
    }else{
        return state;
    }

};

const username = (state = '', action) => {
    if(action.type==='username'){
        return action.payload;
    }else{
        return state;
    }
};

const balance = (state = 0, action) => {
    if(action.type==='plusBalance'){
        return state+(isNaN(action.payload)?0:action.payload)
    }else if(action.type==='minusBalance'){
        return state-(isNaN(action.payload)?0:action.payload)
    }else{
        return state;
    }
};


const isloading = (state = false, action) => {
    if(action.type==='loading'){
        return true;
    }else if(action.type==='notloading'){
        return false;
    }else{
        return state;
    }
};


let reducers=combineReducers({
    islogin,
    username,
    balance,
    isloading
})

export default reducers;
