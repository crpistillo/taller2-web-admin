export const SHOW_EMAIL_SIGNUP_ERROR_MESSAGE = 'SHOW_EMAIL_SIGNUP_ERROR_MESSAGE'

const initialState = {
    showEmailErrorMessage: false
}

export const signUpErrorReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_EMAIL_SIGNUP_ERROR_MESSAGE:
            return {...state, showEmailErrorMessage: action.payload}
        default:
            return state
    }
}