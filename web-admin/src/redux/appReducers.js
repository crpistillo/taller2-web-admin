import { store } from '../index';

export const ADD_TOKEN = 'ADD_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

const initialState = {
    token: sessionStorage.getItem("token"),
    loggedIn: sessionStorage.getItem("token") !== null
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            sessionStorage.setItem("token", action.payload)
            return { ...state, token: action.payload, loggedIn: true }
        case REMOVE_TOKEN:
            sessionStorage.removeItem("token")
            return {token: null, loggedIn: false}
        default:
            return state
    }
};

export const getAuthToken = () => {
    return store.getState().appReducer.token
}

