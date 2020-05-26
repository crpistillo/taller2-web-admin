import React, { Component } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import WaitingSpinner from "./WaitingSpinner";

class GeneralModal extends Component {
  _successBagde() {
    if (this.props.showDeleteSuccessBagde) {
      return (
        <Badge color="success" pill>
          User deleted
        </Badge>
      );
    } else return <div />;
  }

  _errorBagde() {
    if (this.props.showDeleteErrorBagde) {
      return (
        <Badge color="danger" pill>
          Error deleting user
        </Badge>
      );
    } else return <div />;
  }

  render() {
    const successBagde = this._successBagde();
    const errorBagde = this._errorBagde();
    const disabledButton =
      this.props.showDeleteSuccessBagde || this.props.showDeleteErrorBagde;
    return (
      <Modal show={true} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={8}>{this.props.body}</Col>
            <Col xs={4}>
              <WaitingSpinner activated={this.props.activateSpinner} />
              {successBagde}
              {errorBagde}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={disabledButton}
            onClick={() => this.props.confirmAction(this.props.confirmPayload)}
          >
            {this.props.confirmationText}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default GeneralModal;
