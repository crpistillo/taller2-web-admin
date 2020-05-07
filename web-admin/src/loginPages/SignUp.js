import React, { Component } from "react";
import { connect } from 'react-redux';

import { SHOW_SIGNUP_ERROR_MESSAGE, SHOW_SIGNUP_SPINNER, SHOW_SUCCESSFUL_SIGNUP } from '../redux/signUpReducer';

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

    setOnSpinner = () => this.props.setSpinner(true)
    setOffSpinner = () => this.props.setSpinner(false)

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

        let request = new Request(USERS_ENDPOINT, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(data)
        })

        return request;
    }

    processResponse(response) {
        if (response.ok) {
            response.json().then(json => { console.log(json) })
            this.props.setSuccessful()
        }

        else {
            response.json().then(json => {
                this.props.setErrorMessage(true, json.message)
            })
        }

        this.setOffSpinner()
    }

    render() {
        return (
            <FormContainer
                formHeader={this.props.text}
                formFields={this.formFields}
                submitButtonText={this.props.text}
                extraLinkSuffix="Already registered"
                extraLinkHref="/sign-in"
                extraLinkText="sign in?"
                showExtraLink={this.props.showLink}
                errorMessage={this.props.errorMessage}
                showErrorMessage={this.props.showErrorMessage}
                setErrorMessage={this.props.setErrorMessage}
                successMessage={this.props.successMessage}
                showSuccessMessage={this.props.showSuccessMessage}
                setSuccessMessage={this.props.setSuccessMessage}
                errorEmailText={this.errorEmailText}
                generateRequest={this.generateRequest.bind(this)}
                emailAddress={this.state.emailAddress}
                showSpinner={this.props.showSpinner}
                setOnSpinner={this.setOnSpinner.bind(this)}
                processResponse={this.processResponse.bind(this)} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showErrorMessage: state.signUpReducer.showErrorMessage,
        errorMessage: state.signUpReducer.errorMessage,
        showSpinner: state.signUpReducer.showSignUpSpinner,
        successMessage: state.signUpReducer.successMessage,
        showSuccessMessage: state.signUpReducer.showSuccessMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setErrorMessage: (value, message) => {
            dispatch({ type: SHOW_SIGNUP_ERROR_MESSAGE, payload: { showErrorMessage: value, errorMessage: message } })
        },
        setSpinner: (value) => dispatch({ type: SHOW_SIGNUP_SPINNER, payload: value }),

        setSuccessful: (value) => dispatch({ type: SHOW_SUCCESSFUL_SIGNUP, payload: value })
    }
}

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default SignUpContainer;

