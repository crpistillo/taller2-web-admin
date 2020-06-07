import React, { Component } from 'react';
import { connect } from 'react-redux'
import { REMOVE_TOKEN } from '../redux/appReducers';
import CommonNavbar from '../common/CommonNavbar';

class AdminNavbar extends Component {
    render() {
        return (
            <CommonNavbar chotuveLink="/home" links={
                [{
                    redirectLink: "/users/add",
                    linkText: "Users"
                }, {
                    redirectLink: "/media",
                    linkText: "Media Server"
                }, {
                    redirectLink: "/sign-in",
                    linkText: "Logout",
                    onClick: this.props.removeToken
                }]
            } />
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loggedIn: state.appReducer.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeToken: () => dispatch({ type: REMOVE_TOKEN })
    }
}

const AdminNavbarContainer = connect(mapStateToProps, mapDispatchToProps)(AdminNavbar)

export default AdminNavbarContainer;