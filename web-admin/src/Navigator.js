import React, { Component } from "react";
import LoginNavbar from './loginPages/LoginNavbar';
import { connect } from 'react-redux';
import Sidebar from "./sidebar/Sidebar";

class Navigator extends Component {
    _navigatorComponent() {
        if (this.props.token === undefined) {
            return (<LoginNavbar />)
        } else {
            return (<Sidebar />)
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
    return {token: state.appReducer.token}
}

const NavigatorContainer = connect(mapStateToProps)(Navigator)

export default NavigatorContainer;