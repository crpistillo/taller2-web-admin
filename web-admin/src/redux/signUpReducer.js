export const SHOW_SIGNUP_ERROR_MESSAGE = 'SHOW_SIGNUP_ERROR_MESSAGE'
export const SHOW_SIGNUP_SPINNER = 'SHOW_SIGNUP_SPINNER'

const initialState = {
    showErrorMessage: false,
    errorMessage: '',
    showSignUpSpinner: false
}

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SIGNUP_ERROR_MESSAGE:
            return {
                ...state, showErrorMessage: action.payload.showErrorMessage,
                errorMessage: action.payload.errorMessage
            }
        case SHOW_SIGNUP_SPINNER:
            return { ...state, showSignUpSpinner: action.payload }
        default:
            return state
    }
}
