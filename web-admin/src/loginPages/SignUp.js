import React, { Component } from "react";
import { connect } from 'react-redux';

import { SHOW_SIGNUP_ERROR_MESSAGE } from '../redux/signUpErrorReducer';

import { USERS_ENDPOINT } from '../vars/endpoints';

import FormContainer from "./FormContainer";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            emailAddress: '',
            password: '',
        };

        this.formFields = [{
            label: 'Email address',
            type: 'text',
            placeholder: 'Enter email',
            onChangeAction: (value) => (this.setState({ emailAddress: value }))
        }, {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            onChangeAction: (value) => (this.setState({ password: value }))
        }, {
            label: 'Full name',
            type: 'text',
            placeholder: 'Full name',
            onChangeAction: (value) => (this.setState({ fullName: value })),
        }]
        
        this.errorEmailText = "Please, review your email."
    }

    generateRequest() {        
        let data = {
            email: this.state.emailAddress,
            password: this.state.password,
            fullname: this.state.fullName,
            phone_number: "1111-1111",
            photo: ""
        }

        let requestHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        console.log(JSON.stringify(data))

        let request = new Request(USERS_ENDPOINT, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(data)
        })

        return request; 
    }

    processResponse(response) {
        if(response.ok) {
            response.json().then(json => console.log(json))
        }

        else {
            response.json().then(json => console.log("Error", json))
        }
          
    }

    processRequest(request) {
        fetch(request)
            .then(response => this.processResponse(response))
    }

    render() {
        return (
            <div>
                <FormContainer
                    formHeader="Sign up"
                    formFields={this.formFields}
                    submitButtonText="Sign up"
                    extraLinkSuffix="Already registered"
                    extraLinkHref="/sign-in"
                    extraLinkText="sign in?"
                    errorMessage={this.props.errorMessage}
                    showErrorMessage={this.props.showErrorMessage}
                    setErrorMessage={this.props.setErrorMessage}
                    errorEmailText={this.errorEmailText}
                    generateRequest={this.generateRequest.bind(this)}
                    processRequest={this.processRequest.bind(this)}
                    emailAddress={this.state.emailAddress} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showErrorMessage: state.signUpErrorReducer.showErrorMessage,
        errorMessage: state.signUpErrorReducer.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setErrorMessage: (value, message) =>{
            dispatch({ type: SHOW_SIGNUP_ERROR_MESSAGE, payload: {showErrorMessage: value, errorMessage: message} })
        } 
    }
}

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default SignUpContainer;

