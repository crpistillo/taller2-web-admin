export const SHOW_SIGNUP_ERROR_MESSAGE = 'SHOW_LOGIN_ERROR_MESSAGE'

const initialState = {
    showErrorMessage: false,
    errorMessage: ''
}

export const signUpErrorReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_SIGNUP_ERROR_MESSAGE:
            return {...state, showErrorMessage: action.payload.showErrorMessage,
                        errorMessage: action.payload.errorMessage}
        default:
            return state
    }
}
