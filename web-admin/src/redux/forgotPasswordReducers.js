export const SHOW_RECOVER_ERROR_MESSAGE = 'SHOW_LOGIN_ERROR_MESSAGE'
export const SHOW_RECOVER_SPINNER = 'SHOW_SIGNUP_SPINNER'
export const SHOW_SUCCESSFUL_RECOVER = 'SHOW_SUCCESSFUL_SIGNUP'
export const GO_NEW_PASSWORD = 'GO_NEW_PASSWORD'

const initialState = {
    showErrorMessage: false,
    errorMessage: '',
    showForgotPasswordSpinner: false,
    newPasswordPage: false,
    success: false,
}

export const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_RECOVER_ERROR_MESSAGE:
            return {
                ...state, showErrorMessage: action.payload.showErrorMessage,
                errorMessage: action.payload.errorMessage
            }
        case SHOW_RECOVER_SPINNER:
            return { ...state, showForgotPasswordSpinner: action.payload }

        case SHOW_SUCCESSFUL_RECOVER:
            return { ...state, success: action.payload }

        case GO_NEW_PASSWORD:
            return { ...state, newPasswordPage: true }

        default:
            return state
    }
}
