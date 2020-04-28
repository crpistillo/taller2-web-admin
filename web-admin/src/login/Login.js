import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.usernameInput = React.createRef();
    }

    handleSubmit() {
        console.log(this.props.token)
        if (this.state.username === "uriel") {
            this.props.onClickedLoginButton("urielsinho_token")
        } else {
            this.props.onClickedLoginButton("juliansinho_token")
        }
    }

    render() {
        return (
            <Container>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Username</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="text" onChange={(e) => this.setState({ username: e.target.value })} />
                </InputGroup >

                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="text" onChange={(e) => this.setState({ password: e.target.value })} />
                </InputGroup>


                <Button variant="primary" type="submit" onClick={() => this.handleSubmit()}>
                    Login
                </Button>
            </Container >

        )
    }
}
