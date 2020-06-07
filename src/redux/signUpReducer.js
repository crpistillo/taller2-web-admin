export const SHOW_SIGNUP_ERROR_MESSAGE = 'SHOW_SIGNUP_ERROR_MESSAGE'
export const SHOW_SIGNUP_SPINNER = 'SHOW_SIGNUP_SPINNER'
export const SHOW_SUCCESSFUL_SIGNUP = 'SHOW_SUCCESSFUL_SIGNUP'
export const SHOW_SUCCESS_MESSAGE =  'SHOW_SUCCESS_MESSAGE'

const initialState = {
    showErrorMessage: false,
    errorMessage: '',
    showSignUpSpinner: false,
    success: false,
    successMessage: '',
    showSuccessMessage: false
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

        case SHOW_SUCCESSFUL_SIGNUP:
            return { ...state, success: action.payload }

        case SHOW_SUCCESS_MESSAGE:
            return {
                ...state, showSuccessMessage: action.payload.showSuccessMessage,
                successMessage: action.payload.successMessage
            }

        default:
            return state
    }
}
