export const ADD_TOKEN = 'ADD_TOKEN';

const initialState = {
    token: undefined,
    loggedIn: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return { ...state, token: action.payload, loggedIn: true }
        default:
            return state
    }
};



