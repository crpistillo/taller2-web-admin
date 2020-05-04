export const ADD_TOKEN = 'ADD_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

const initialState = {
    token: undefined,
    loggedIn: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return { ...state, token: action.payload, loggedIn: true }
        case REMOVE_TOKEN:
            return initialState
        default:
            return state
    }
};



