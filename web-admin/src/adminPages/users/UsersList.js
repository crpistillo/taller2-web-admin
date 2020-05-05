import React, { Component } from 'react';
import JumbotronHeader from '../JumbotronHeader';

import { connect } from 'react-redux';

import { FETCH_USERS } from '../../redux/listUsersReducers';

class UsersList extends Component {
    constructor(props){
        super(props);
        
        this.usersPerPage = 10
        this.headerText = "Users list"
        this.descriptionText = "Here you can see a list of all the registered users. The list is ordered \
                                alphabetically by email address field. If you want to edit a user profile,\
                                click on the corresponding button."
    }

    componentDidMount(){
        let { pageNumber } = this.props.match.params
        console.log("UOOOO")
        this.props.fetchUsers(pageNumber, this.usersPerPage)
    }

    render(){
        return (
            <JumbotronHeader headerText={this.headerText} descriptionText={this.descriptionText}/>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.listUsersReducer.users,
        totalPages: state.listUsersReducer.totalPages,
        alreadyFetched: state.listUsersReducer.alreadyFetched
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (pageNumber, usersPerPage) =>{
            console.log("ASDASDSA")
            dispatch( {type: FETCH_USERS, payload: { pageNumber: pageNumber, usersPerPage: usersPerPage } } )
        } 
    }
}

const UsersListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList)

export default UsersListContainer;