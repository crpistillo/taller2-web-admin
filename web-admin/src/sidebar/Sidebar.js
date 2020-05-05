import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { REMOVE_TOKEN } from '../redux/appReducers';

class Sidebar extends Component {

    render() {
        return (
            <Menu>
                <Link className="nav-link" to={"/home"}>Home</Link>
                <Link className="nav-link" to={"/users"}>Users</Link>
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
        removeToken: () => dispatch({ type: REMOVE_TOKEN })
    }
}

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer;
