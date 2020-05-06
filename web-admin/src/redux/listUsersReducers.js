import { REGISTERED_USERS_ENDPOINT } from '../vars/endpoints';

import { store } from '../index';

export const FETCH_USERS = 'FETCH_USERS';
const SET_USERS_AND_PAGES = 'SET_USERS';

const initialState = {
    users: [],
    totalPages: 0,
    alreadyFetched: false
}

const generateRequest = (pageNumber, usersPerPage, authToken) => {
    let fetchEndpoint = REGISTERED_USERS_ENDPOINT + `?page=${pageNumber}&users_per_page=${usersPerPage}`

    let requestHeaders = {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
    }

    let request = new Request(fetchEndpoint, {
        method: 'GET',
        headers: requestHeaders
    })

    return request;
}

const fetchUsers = (pageNumber, usersPerPage, authToken) => {
    let request = generateRequest(pageNumber, usersPerPage, authToken)
    fetch(request)
        .then(response => response.json())
        .then(response => store.dispatch({ type: SET_USERS_AND_PAGES, payload: { users: response.results, pages: response.pages}}))
        .catch(error => console.log("Error fetching users: ", error))

}

export const listUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            fetchUsers(action.payload.pageNumber, action.payload.usersPerPage, action.payload.token)
            return state

        case SET_USERS_AND_PAGES:
            console.log(action.payload)
            return {
                users: action.payload.users,
                totalPages: action.payload.pages,
                alreadyFetched: true
            }

        default:
            return initialState;
    }
}