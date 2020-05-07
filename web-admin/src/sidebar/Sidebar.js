import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { REMOVE_TOKEN } from '../redux/appReducers';
import { SHOW_SUCCESSFUL_SIGNUP, SHOW_SUCCESS_MESSAGE } from '../redux/signUpReducer';

class Sidebar extends Component {

    render() {
        return (
            <Menu>
                <Link className="nav-link" to={"/home"}>Home</Link>
                <Link className="nav-link" to={"/users"} onClick={() => this.props.setSuccessful(false)}>Users</Link>
                <Link className="nav-link" to={"/media"}>Media Server</Link>
                <Link className="nav-link" to={"/sign-in"} onClick={this.props.removeToken}>Logout</Link>
            </Menu>
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
        removeToken: () => dispatch({ type: REMOVE_TOKEN }),
        setSuccessful: (value) =>{
            dispatch( {type: SHOW_SUCCESSFUL_SIGNUP, payload: value})
            dispatch( {type: SHOW_SUCCESS_MESSAGE, payload: {
                showSuccessMessage: false,
                successMessage: ''
            }})

        } 
    }
}

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer;
