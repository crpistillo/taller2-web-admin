export const SHOW_LOGIN_ERROR_MESSAGE = 'SHOW_LOGIN_ERROR_MESSAGE'

const initialState = {
    showErrorMessage: false,
    errorMessage: ''
}

export const loginErrorReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_LOGIN_ERROR_MESSAGE:
            return {...state, showErrorMessage: action.payload.showErrorMessage,
                        errorMessage: action.payload.errorMessage}
        default:
            return state
    }
}

