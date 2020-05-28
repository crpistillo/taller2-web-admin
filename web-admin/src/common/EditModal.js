import React, { Component } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WaitingSpinner from "./WaitingSpinner";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { connect } from "react-redux";

import {
  SHOW_EDIT_ERROR_MESSAGE,
  SHOW_SUCCESSFUL_EDIT,
  SHOW_SUCCESS_MESSAGE,
} from "../redux/editModalReducers";

import { USERS_ENDPOINT } from "../vars/endpoints";

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      email: this.props.userEmail,
      password: "",
      fullname: "",
      phoneNumber: "",
      photo: "",
    };
  }

  setOnSpinner = () => this.setState({ spinner: true });
  setOffSpinner = () => this.setState({ spinner: false });

  generateRequest() {
    let data = {
      email: this.state.email,
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
    console.log(this.state);
    return (
      <Modal show={true} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <Form>
                <Form.Group controlId="readOnlyEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    readOnly
                    type="text"
                    defaultValue={this.props.userEmail}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicFullName">
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      this.setState({ fullname: event.target.value })
                    }
                    placeholder="Enter Full Name"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      this.setState({ password: event.target.value })
                    }
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPhoneNumber">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      this.setState({ phoneNumber: event.target.value })
                    }
                    placeholder="Enter Phone Number"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={12}>
              <WaitingSpinner activated={this.state.spinner} />
              <Alert show={this.props.showErrorMessage} variant="danger">
                No se pudo editar al usuario
              </Alert>
              <Alert variant="success" show={this.props.showSuccessMessage}>
                Se edito al usuario correctamente
              </Alert>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.setOnSpinner}>
            {this.props.confirmationText}
          </Button>
        </Modal.Footer>
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
