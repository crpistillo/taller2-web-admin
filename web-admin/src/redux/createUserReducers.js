export const SHOW_CREATE_USER_ERROR_MESSAGE = 'SHOW_CREATE_USER_ERROR_MESSAGE'
export const SHOW_CREATE_USER_SPINNER = 'SHOW_CREATE_USER_SPINNER'

const initialState = {
    showErrorMessage: false,
    errorMessage: '',
    showSignUpSpinner: false
}

export const createUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CREATE_USER_ERROR_MESSAGE:
            return {
                ...state, showErrorMessage: action.payload.showErrorMessage,
                errorMessage: action.payload.errorMessage
            }
        case SHOW_CREATE_USER_SPINNER:
            return { ...state, showSignUpSpinner: action.payload }
        default:
            return state
    }
}
