import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Alert from "react-bootstrap/Alert";

class Home extends Component {
  render() {
    if (!this.props.loggedIn) return <Redirect to="/sign-in" />;
    return (
        <div style={{padding: 300}}>
          <Alert variant="secondary">
            <Alert.Heading>Successful login!</Alert.Heading>
            <p>
              Welcome to ChoTuve ® application administrator interface. On the
              navigation bar you will find different application aspects. Click on
              them to administrate it!
            </p>
          </Alert>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.appReducer.loggedIn,
  };
};

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
