export const SHOW_LOGIN_ERROR_MESSAGE = 'SHOW_LOGIN_ERROR_MESSAGE'
export const SHOW_LOGIN_SPINNER = 'SHOW_LOGIN_SPINNER'

const initialState = {
    showErrorMessage: false,
    errorMessage: '',
    showLoginSpinner: false,
    successMessage: '',
    showSuccessMessage: false
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOGIN_ERROR_MESSAGE:
            return {
                ...state, showErrorMessage: action.payload.showErrorMessage,
                errorMessage: action.payload.errorMessage
            }
        case SHOW_LOGIN_SPINNER:
            return {
                ...state, showLoginSpinner: action.payload
            }
        default:
            return state
    }
}

