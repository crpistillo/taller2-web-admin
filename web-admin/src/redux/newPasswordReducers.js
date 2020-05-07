export const SHOW_NEWPASS_ERROR_MESSAGE = 'SHOW_LOGIN_ERROR_MESSAGE'
export const SHOW_NEWPASS_SPINNER = 'SHOW_SIGNUP_SPINNER'
export const SHOW_SUCCESSFUL_NEWPASS = 'SHOW_SUCCESSFUL_SIGNUP'
export const SHOW_SUCCESS_MESSAGE = 'SHOW_SUCCESS_MESSAGE'

const initialState = {
    showErrorMessage: false,
    errorMessage: '',
    showNewPasswordSpinner: false,
    success: false,

    // TODO: Alert success
    showSuccessMessage: false,
    successMessage: ''

}

export const newPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_NEWPASS_ERROR_MESSAGE:
            return {
                ...state, showErrorMessage: action.payload.showErrorMessage,
                errorMessage: action.payload.errorMessage
            }
        case SHOW_NEWPASS_SPINNER:
            return { ...state, showForgotPasswordSpinner: action.payload }

        case SHOW_SUCCESSFUL_NEWPASS:
            return { ...state, success: action.payload }

        //TODO : Alert Success
        case SHOW_SUCCESS_MESSAGE:
            return {
                ...state, showSuccessMessage: action.payload.showSuccessMessage,
                successMessage: action.payload.successMessage
            }

        default:
            return state
    }
}
