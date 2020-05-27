import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class EditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      fullname: "",
      phoneNumber: "",
    };
  }
  render() {
    return (
      <Form>
        <Form.Group controlId="readOnlyEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            readOnly
            type="text"
            placeholder={this.props.userToEdit}
          />
        </Form.Group>
        <Form.Group controlId="formBasicFullName">
          <Form.Label>Fullname</Form.Label>
          <Form.Control placeholder="Enter Full Name" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formBasicPhoneNumber">
          <Form.Label>Phone number</Form.Label>
          <Form.Control placeholder="Enter Phone Number" />
        </Form.Group>
      </Form> //TODO: Cambiar a una componente externa
    );
  }
}

export default EditForm;
