import React, { Component } from "react";
import LoginNavbar from './loginPages/LoginNavbar';
import { connect } from 'react-redux';
import SidebarContainer from "./sidebar/Sidebar";

class Navigator extends Component {
    _navigatorComponent() {
        if (!this.props.loggedIn) {
            return (<LoginNavbar />)
        } else {
            return (<SidebarContainer />)
        }
    }

    render() {
        let navigatorComponent = this._navigatorComponent()
        return (
            navigatorComponent
        )
    }
}

const mapStateToProps = (state) => {
    return { loggedIn: state.appReducer.loggedIn }
}

const NavigatorContainer = connect(mapStateToProps)(Navigator)

export default NavigatorContainer;