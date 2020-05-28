import React, { Component } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WaitingSpinner from "./WaitingSpinner";
import Form from "react-bootstrap/Form";

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      fullname: "",
      phoneNumber: "",
    };
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
            <Col xs={8}>
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
            <Col xs={4}>
              <WaitingSpinner activated={this.props.activateSpinner} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            // disabled={disabledButton}
            onClick={() => this.props.confirmAction(this.props.confirmPayload)}
          >
            {this.props.confirmationText}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditModal;
