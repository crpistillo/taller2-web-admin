import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Stats extends Component {
    render() {
        if (!this.props.loggedIn) return <Redirect to="/sign-in" />;

        return (
            <div>
                Hello
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.appReducer.loggedIn,
    };
};

const StatsContainer = connect(mapStateToProps)(Stats);

export default StatsContainer;
