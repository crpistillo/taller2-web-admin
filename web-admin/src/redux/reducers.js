export const ADD_TOKEN = 'ADD_TOKEN';

const initialState = {
    token: undefined
};

export const simpleReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TOKEN:
            return {...state, token: action.payload}
        default:
            return state
    }
};



