import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import JumbotronHeader from "../JumbotronHeader";
import SignUpContainer from "../../loginPages/SignUp";

import { connect } from "react-redux";

import { SHOW_SUCCESSFUL_SIGNUP } from "../../redux/signUpReducer";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSuccessMessage: false,
    };

    this.headerText = "Create user in database";
    this.descriptionText =
      "In order to create a user in the database, please fill the following form. After sending it, a user of the main application will be able to log-in with the specified credentials";
  }

  _successMessage() {
    return(
        <Snackbar open={this.props.success} autoHideDuration={6000}
                  onClose={() => this.props.setSuccessful(false)}>
          <MuiAlert elevation={6} variant="filled" onClose={() => this.props.setSuccessful(false)} severity="success">
            User created successfully!
          </MuiAlert>
        </Snackbar>
    );
  }

  render() {
    const successMessage = this._successMessage();
    console.log(this.props.success)
    return (
      <Row>
        <JumbotronHeader
          headerText={this.headerText}
          descriptionText={this.descriptionText}
        />
        <Col xs={12}>
          <SignUpContainer
            text={"Create user in database"}
            showLink={false}
            hasToShowMessage={false}
          />
        </Col>
        {successMessage}
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    success: state.signUpReducer.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSuccessful: (value) =>
      dispatch({ type: SHOW_SUCCESSFUL_SIGNUP, payload: value }),
  };
};

const AddUserContainer = connect(mapStateToProps, mapDispatchToProps)(AddUser);

export default AddUserContainer;
