import { REGISTERED_USERS_ENDPOINT, USERS_ENDPOINT } from "../vars/endpoints";

import { store } from "../index";

export const FETCH_USERS = "FETCH_USERS";
export const CHANGE_LIST_PAGE = "CHANGE_LIST_PAGE";
export const RESET_PAGE_STATE = "RESET_PAGE_STATE";
export const DISPLAY_DELETE_POPUP = "DISPLAY_DELETE_POPUP";
export const DISPLAY_EDIT_POPUP = "DISPLAY_EDIT_POPUP";
export const CLOSE_POPUP = "CLOSE_POPUP";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";
const SUCCESS_DELETE = "SUCCESS_DELETE";
const SUCCESS_EDIT = "SUCCESS_EDIT";
const SET_USERS_AND_PAGES = "SET_USERS";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_EDIT = "ERROR_EDIT";

const initialState = {
  users: [],
  totalPages: 0,
  alreadyFetched: false,
  nextPage: 0,
  hasToChangePage: false,
  showDeletePopup: false,
  userToDelete: "",
  waitingSpinnerDelete: false,
  showDeleteSuccessBagde: false,
  showDeleteErrorBagde: false,

  userToEdit: "",
  showEditPopup: false,
};

const generateRequest = (endpoint, authToken, requestMethod) => {
  let requestHeaders = {
    Authorization: `Bearer ${authToken}`,
    Accept: "application/json",
  };

  let request = new Request(endpoint, {
    method: requestMethod,
    headers: requestHeaders,
  });

  return request;
};

const generateListUsersRequest = (pageNumber, usersPerPage, authToken) => {
  let fetchEndpoint =
    REGISTERED_USERS_ENDPOINT +
    `?page=${pageNumber - 1}&users_per_page=${usersPerPage}`;

  let request = generateRequest(fetchEndpoint, authToken, "GET");

  return request;
};

const fetchUsers = (pageNumber, usersPerPage, authToken) => {
  let request = generateListUsersRequest(pageNumber, usersPerPage, authToken);
  fetch(request)
    .then((response) => response.json())
    .then((response) =>
      store.dispatch({
        type: SET_USERS_AND_PAGES,
        payload: { users: response.results, pages: response.pages },
      })
    )
    .catch((error) => console.log("Error fetching users: ", error));
};

const generateDeleteUserRequest = (userEmail, authToken) => {
  let fetchEndpoint = USERS_ENDPOINT + `?email=${userEmail}`;

  let request = generateRequest(fetchEndpoint, authToken, "DELETE");

  return request;
};

const generateEditUserRequest = (
  userEmail,
  authToken,
  userPassword,
  userFullname,
  userPhoneNumber
) => {
  let requestHeaders = {
    Authorization: `Bearer ${authToken}`,
    Accept: "application/json",
  };
  let data = {
    email: userEmail,
    password: userPassword,
    fullname: userFullname,
    phone_number: userPhoneNumber,
    photo: "",
    admin: true,
  };

  let request = new Request(USERS_ENDPOINT, {
    method: "PUT",
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
  console.log(request);
  return request;
};

const editUser = (
  userEmail,
  authToken,
  userPassword,
  userFullname,
  userPhoneNumber
) => {
  let request = generateEditUserRequest(
    userEmail,
    authToken,
    userPassword,
    userFullname,
    userPhoneNumber
  );
  fetch(request)
    .then((response) => response.json())
    .then((response) => {
      if (response.message === "OK") {
        store.dispatch({ type: SUCCESS_EDIT });
      } else {
        store.dispatch({ type: ERROR_EDIT });
      }
    })
    .catch(() => store.dispatch({ type: ERROR_DELETE }));
};

const deleteUser = (userEmail, authToken) => {
  let request = generateDeleteUserRequest(userEmail, authToken);
  fetch(request)
    .then((response) => response.json())
    .then((response) => {
      if (response.message === "OK") {
        store.dispatch({ type: SUCCESS_DELETE });
      } else {
        store.dispatch({ type: ERROR_DELETE });
      }
    })
    .catch(() => store.dispatch({ type: ERROR_DELETE }));
};

export const listUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      fetchUsers(
        action.payload.pageNumber,
        action.payload.usersPerPage,
        action.payload.token
      );
      return { ...state, hasToChangePage: false };

    case SET_USERS_AND_PAGES:
      return {
        ...state,
        users: action.payload.users,
        totalPages: action.payload.pages,
        alreadyFetched: true,
      };

    case CHANGE_LIST_PAGE:
      return {
        ...state,
        nextPage: action.payload,
        hasToChangePage: true,
        alreadyFetched: false,
        users: [],
      };

    case RESET_PAGE_STATE:
      return initialState;

    case DISPLAY_DELETE_POPUP:
      return {
        ...state,
        showDeletePopup: true,
        userToDelete: action.payload,
      };
    case DISPLAY_EDIT_POPUP:
      return {
        ...state,
        showEditPopup: true,
        userToEdit: action.payload,
      };
    case CLOSE_POPUP:
      return {
        ...state,
        showDeletePopup: false,
        showEditPopup: false,
        userToDelete: "",
        userToEdit: "",
        waitingSpinnerDelete: false,
        showDeleteSuccessBagde: false,
        showDeleteErrorBagde: false,
      };

    case DELETE_USER:
      deleteUser(action.payload.email, action.payload.token);
      return {
        ...state,
        waitingSpinnerDelete: true,
      };

    case EDIT_USER:
      editUser(
        action.payload.email,
        action.payload.token,
        action.payload.password,
        action.payload.fullname,
        action.payload.phoneNumber
      );
      return {
        ...state,
      };

    case SUCCESS_DELETE:
      return {
        ...state,
        waitingSpinnerDelete: false,
        showDeleteSuccessBagde: true,
      };

    case ERROR_DELETE:
      return {
        ...state,
        waitingSpinnerDelete: false,
        showDeleteErrorBagde: true,
      };

    default:
      return initialState;
  }
};
