import React, { Component } from 'react';
import JumbotronHeader from '../JumbotronHeader';

import { connect } from 'react-redux';

import { getAuthToken } from '../../redux/appReducers';

import {
    FETCH_USERS, CHANGE_LIST_PAGE, RESET_PAGE_STATE,
    DISPLAY_DELETE_POPUP, CLOSE_POPUP, DELETE_USER
} from '../../redux/listUsersReducers';

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import UsersTable from './UsersTable';
import GeneralModal from '../../common/GeneralModal';

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.state = { page: 0 }

        this.usersPerPage = 10
        this.headerText = "Users list"
        this.descriptionText = "Here you can see a list of all the registered users. The list is ordered \
                                alphabetically by email address field. If you want to delete a user profile,\
                                click on the corresponding button."
    }

    componentDidMount() {
        this.setState({ page: 1 })

        this.props.fetchUsers(1, this.usersPerPage)
    }

    componentDidUpdate() {
        if (this.props.hasToChangePage) {
            this.setState({ page: this.props.nextPage })
            this.props.fetchUsers(this.props.nextPage, this.usersPerPage)
        }
    }

    componentWillUnmount() {
        this.props.resetPageState()
    }

    fetched() {
        if (!this.props.alreadyFetched) {
            return (
                <Button variant="light" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Loading...</span>
                </Button>
            )
        }
        else {
            return <UsersTable users={this.props.users}
                page={this.state.page}
                totalPages={this.props.totalPages}
                setNextPage={this.props.setNextPage}
                clickDeleteButton={this.props.displayDeletePopup} />
        }
    }

    deleteUserPopup() {
        if (this.props.showDeletePopup) {
            return <GeneralModal
                title={"Delete user"}
                body={`Do you really want to delete user ${this.props.userToDelete} ?`}
                confirmationText={"Yes"}
                userEmail={this.props.userToDelete}
                handleClose={this.props.closeDeletePopup}
                confirmPayload={this.props.userToDelete}
                confirmAction={this.props.deleteUser}
                activateSpinner={this.props.waitingSpinnerDelete}
                showDeleteSuccessBagde={this.props.showDeleteSuccessBagde}
                showDeleteErrorBagde={this.props.showDeleteErrorBagde}
            />
        } else {
            return <div />
        }
    }

    render() {
        const fetched = this.fetched()
        const deleteUser = this.deleteUserPopup()
        return (
            <div>
                {deleteUser}
                <JumbotronHeader headerText={this.headerText} descriptionText={this.descriptionText} />
                {fetched}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.listUsersReducer.users,
        totalPages: state.listUsersReducer.totalPages,
        alreadyFetched: state.listUsersReducer.alreadyFetched,
        hasToChangePage: state.listUsersReducer.hasToChangePage,
        nextPage: state.listUsersReducer.nextPage,
        showDeletePopup: state.listUsersReducer.showDeletePopup,
        userToDelete: state.listUsersReducer.userToDelete,
        waitingSpinnerDelete: state.listUsersReducer.waitingSpinnerDelete,
        showDeleteSuccessBagde: state.listUsersReducer.showDeleteSuccessBagde,
        showDeleteErrorBagde: state.listUsersReducer.showDeleteErrorBagde
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (pageNumber, usersPerPage) => {
            const authToken = getAuthToken()
            dispatch({
                type: FETCH_USERS, payload: {
                    pageNumber: pageNumber,
                    usersPerPage: usersPerPage,
                    token: authToken
                }
            })
        },
        setNextPage: (nextPage) => dispatch({ type: CHANGE_LIST_PAGE, payload: nextPage }),
        resetPageState: () => dispatch({ type: RESET_PAGE_STATE }),
        displayDeletePopup: (userToDelete) => dispatch({ type: DISPLAY_DELETE_POPUP, payload: userToDelete }),
        closeDeletePopup: () => dispatch({ type: CLOSE_POPUP }),
        deleteUser: (userEmail) => {
            const authToken = getAuthToken()
            dispatch({
                type: DELETE_USER, payload: {
                    email: userEmail,
                    token: authToken
                }
            })
        }
    }
}

const UsersListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList)

export default UsersListContainer;