import React, { Component } from "react";

import Modal from "react-bootstrap/Modal";
import FormContainer from "../loginPages/FormContainer";

import { connect } from "react-redux";

import { getAuthToken } from "../redux/appReducers";

import {
  SHOW_EDIT_ERROR_MESSAGE,
  SHOW_SUCCESSFUL_EDIT,
  SHOW_SUCCESS_MESSAGE,
  SHOW_EDIT_SPINNER,
} from "../redux/editModalReducers";

import { EDIT_USER_ENDPOINT } from "../vars/endpoints";

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      emailAddress: props.userEmail,
      password: "",
      phoneNumber: "",
      photo: null,
    };

    this.formFields = [
      {
        label: "Email address",
        type: "text",
        placeholder: "Enter email",
        defaultValue: this.props.userEmail,
        readonly: true,
      },
      {
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        onChangeAction: (target) => this.setState({ password: target.value }),
      },
      {
        label: "Full name",
        type: "text",
        placeholder: "Full name",
        onChangeAction: (target) => this.setState({ name: target.value }),
      },
      {
        label: "Phone number",
        type: "text",
        placeholder: "Enter Phone number",
        onChangeAction: (target) =>
          this.setState({ phoneNumber: target.value }),
      },
      {
        label: "Choose photo",
        type: "file",
        placeholder: "Select photo",
        onChangeAction: (target) => this.setState({ photo: target.files[0] }),
      },
    ];
  }

  setOnSpinner = () => this.setState({ spinner: true });
  setOffSpinner = () => this.setState({ spinner: false });

  generateRequest() {
    var formData = new FormData();
    const authToken = getAuthToken();

    formData.append("fullname", this.state.name);
    formData.append("password", this.state.password);
    formData.append("phone_number", this.state.phoneNumber);
    if (this.state.photo) formData.append("photo", this.state.photo, "image");

    let requestHeaders = {
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
      email: this.state.emailAddress,
    };

    let request = new Request(
      EDIT_USER_ENDPOINT + `&email=${this.state.emailAddress}`,
      {
        method: "PUT",
        headers: requestHeaders,
        body: formData,
      }
    );
    console.log(request);
    return request;
  }

  processResponse(response) {
    console.log(response);
    if (response.ok) {
      response.json().then((json) => {
        console.log(json);
      });
      this.props.setSuccessMessage(true, "Succesfully edited");
      window.location.reload();
    } else {
      response.json().then((json) => {
        console.log(json.message);
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
