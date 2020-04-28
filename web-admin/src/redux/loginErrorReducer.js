export const SHOW_EMAIL_ERROR_MESSAGE = 'SHOW_EMAIL_ERROR_MESSAGE'

const initialState = {
    showEmailErrorMessage: false
}

export const loginErrorReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type) {
        case SHOW_EMAIL_ERROR_MESSAGE:
            return {...state, showEmailErrorMessage: action.payload}
        default:
            return state
    }
}

