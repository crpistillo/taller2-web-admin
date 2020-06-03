import React, { Component } from "react";

import Modal from "react-bootstrap/Modal";
import FormContainer from "../loginPages/FormContainer";

import { connect } from "react-redux";

import {
  SHOW_EDIT_ERROR_MESSAGE,
  SHOW_SUCCESSFUL_EDIT,
  SHOW_SUCCESS_MESSAGE,
  SHOW_EDIT_SPINNER,
} from "../redux/editModalReducers";

import { USERS_ENDPOINT } from "../vars/endpoints";

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      emailAddress: props.userEmail,
      password: "",
      phoneNumber: "",
      photo: "",
    };

    this.formFields = [
      {
        label: "Email address",
        type: "text",
        placeholder: "Enter email",
        defaultValue: this.props.userEmail,
        readonly: true,
        onChangeAction: (value) => this.setState({ emailAddress: value }),
      },
      {
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        onChangeAction: (value) => this.setState({ password: value }),
      },
      {
        label: "Full name",
        type: "text",
        placeholder: "Full name",
        onChangeAction: (value) => this.setState({ fullName: value }),
      },
      {
        label: "Phone number",
        type: "text",
        placeholder: "Enter Phone number",
        onChangeAction: (value) => this.setState({ phoneNumber: value }),
      },
    ];
  }

  setOnSpinner = () => this.setState({ spinner: true });
  setOffSpinner = () => this.setState({ spinner: false });

  generateRequest() {
    let data = {
      email: this.state.emailAddress,
      password: this.state.password,
      fullname: this.state.fullname,
      phoneNumber: this.state.phoneNumber,
      photo: this.state.photo,
    };

    let requestHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    let request = new Request(USERS_ENDPOINT, {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify(data),
    });

    console.log(data);
    return request;
  }

  processResponse(response) {
    console.log(response);
    if (response.ok) {
      response.json().then((json) => {
        console.log(json);
      });
      this.props.setSuccessMessage(true, "Succesfully edited");
      this.props.setSuccessful();
    } else {
      response.json().then((json) => {
        this.props.setErrorMessage(true, json.message);
      });
    }

    this.setOffSpinner();
  }

  render() {
    return (
      <Modal show={true} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer
            formHeader={this.props.text}
            formFields={this.formFields}
            submitButtonText="Edit"
            errorMessage={this.props.errorMessage}
            showErrorMessage={this.props.showErrorMessage}
            setErrorMessage={this.props.setErrorMessage}
            successMessage={this.props.successMessage}
            showSuccessMessage={this.props.showSuccessMessage}
            setSuccessMessage={this.props.setSuccessMessage}
            generateRequest={this.generateRequest.bind(this)}
            emailAddress={this.state.emailAddress}
            showSpinner={this.props.showSpinner}
            setOnSpinner={this.setOnSpinner.bind(this)}
            processResponse={this.processResponse.bind(this)}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showErrorMessage: state.editModalReducer.showErrorMessage,
    errorMessage: state.editModalReducer.errorMessage,
    success: state.editModalReducer.success,
    successMessage: state.editModalReducer.successMessage,
    showSuccessMessage: state.editModalReducer.showSuccessMessage,
    showSpinner: state.editModalReducer.showEditSpinner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorMessage: (value, message) => {
      dispatch({
        type: SHOW_EDIT_ERROR_MESSAGE,
        payload: { showErrorMessage: value, errorMessage: message },
      });
    },
    setSpinner: (value) =>
      dispatch({ type: SHOW_EDIT_SPINNER, payload: value }),

    setSuccessful: (value) =>
      dispatch({ type: SHOW_SUCCESSFUL_EDIT, payload: value }),

    setSuccessMessage: (value, successMessage) =>
      dispatch({
        type: SHOW_SUCCESS_MESSAGE,
        payload: { showSuccessMessage: value, successMessage: successMessage },
      }),
  };
};

const EditModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModal);

export default EditModalContainer;
