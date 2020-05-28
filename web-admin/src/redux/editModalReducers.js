export const SHOW_EDIT_ERROR_MESSAGE = "SHOW_LOGIN_ERROR_MESSAGE";
export const SHOW_EDIT_SPINNER = "SHOW_EDIT_SPINNER";
export const SHOW_SUCCESSFUL_EDIT = "SHOW_SUCCESSFUL_EDIT";
export const SHOW_SUCCESS_MESSAGE = "SHOW_SUCCESS_MESSAGE";

const initialState = {
  showErrorMessage: false,
  errorMessage: "",
  success: false,
  showSuccessMessage: false,
  successMessage: "",
};

export const editModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_EDIT_ERROR_MESSAGE:
      return {
        ...state,
        showErrorMessage: action.payload.showErrorMessage,
        errorMessage: action.payload.errorMessage,
      };
    case SHOW_SUCCESSFUL_EDIT:
      return { ...state, success: action.payload };

    case SHOW_SUCCESS_MESSAGE:
      return {
        ...state,
        showSuccessMessage: action.payload.showSuccessMessage,
        successMessage: action.payload.successMessage,
      };

    default:
      return state;
  }
};
