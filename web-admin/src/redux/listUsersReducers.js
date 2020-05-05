import { REGISTERED_USERS_ENDPOINT } from '../vars/endpoints';

export const FETCH_USERS = 'FETCH_USERS';

const initialState = {
    users: [],
    totalPages: 0,
    alreadyFetched: false
}

const fetchUsers = (pageNumber, usersPerPage) => {
    let fetchEndpoint = REGISTERED_USERS_ENDPOINT + `?page=${pageNumber}&users_per_page=${usersPerPage}`
    console.log(fetchEndpoint)

    return {
        users: [],
        totalPages: 5
    }
}

export const listUsersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS:
            const response = fetchUsers(action.payload.pageNumber, action.payload.usersPerPage)
            return {users: response.users, totalPages: response.totalPages, alreadyFetched: true}
        
        default:
            return initialState;
    }
}