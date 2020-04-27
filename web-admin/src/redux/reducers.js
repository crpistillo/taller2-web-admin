import {combineReducers} from 'redux';

export const ADD_TOKEN = 'ADD_TOKEN';

const initialState = {
    token:''
};

const simpleReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_TOKEN:
            return {...state, token: action.payload}
        default:
            return state
    }
};

export const reducers = combineReducers({simpleReducer});




