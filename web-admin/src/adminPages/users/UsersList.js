import React, { Component } from 'react';
import JumbotronHeader from '../JumbotronHeader';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { getAuthToken } from '../../redux/appReducers';

import { FETCH_USERS, CHANGE_LIST_PAGE, RESET_PAGE_STATE } from '../../redux/listUsersReducers';

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import UsersTable from './UsersTable';

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.state = { page: 0 }

        this.usersPerPage = 10
        this.headerText = "Users list"
        this.descriptionText = "Here you can see a list of all the registered users. The list is ordered \
                                alphabetically by email address field. If you want to edit a user profile,\
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
                setNextPage={this.props.setNextPage} />
        }
    }

    render() {
        const fetched = this.fetched()
        return (
            <div>
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
        nextPage: state.listUsersReducer.nextPage
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
        resetPageState: () => dispatch({ type: RESET_PAGE_STATE })
    }
}

const UsersListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList)

export default UsersListContainer;