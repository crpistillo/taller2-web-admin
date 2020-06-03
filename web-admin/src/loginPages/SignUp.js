import React, { Component } from "react";
import { connect } from 'react-redux';

import { SHOW_SIGNUP_ERROR_MESSAGE, SHOW_SIGNUP_SPINNER, SHOW_SUCCESSFUL_SIGNUP, SHOW_SUCCESS_MESSAGE } from '../redux/signUpReducer';

import { CREATE_USER_ENDPOINT } from '../vars/endpoints';

import FormContainer from "./FormContainer";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            emailAddress: '',
            password: '',
            photo: null
        };

        this.formFields = [{
            label: 'Email address',
            type: 'text',
            placeholder: 'Enter email',
            onChangeAction: (target) => (this.setState({ emailAddress: target.value }))
        }, {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            onChangeAction: (target) => (this.setState({ password: target.value }))
        }, {
            label: 'Full name',
            type: 'text',
            placeholder: 'Full name',
            onChangeAction: (target) => (this.setState({ fullName: target.value })),
        }, {
            label: 'Choose photo',
            type: 'file',
            placeholder: 'Select photo',
            onChangeAction: (target) => (this.setState( {photo: target.files[0]} ))
        }]

        this.errorEmailText = "Please, review your email."
    }

    setOnSpinner = () => this.props.setSpinner(true)
    setOffSpinner = () => this.props.setSpinner(false)

    generateRequest() {
        var formData = new FormData()

        formData.append('email', this.state.email)
        formData.append('password', this.state.password)
        formData.append('fullname', this.state.fullName)
        formData.append('phone-number', '1111-1111')
        formData.append('photo', this.state.photo, 'image')

        let requestHeaders = {
            'Accept': 'application/json',
        }

        let request = new Request(CREATE_USER_ENDPOINT, {
            method: 'POST',
            headers: requestHeaders,
            body: formData
        })

        return request;
    }

    processResponse(response) {
        if (response.ok) {
            this.props.setSuccessful()
            if (this.props.hasToShowMessage) {
                this.props.setSuccessMessage(true, "Successful signup!")
            }
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

        setSuccessful: (value) => dispatch({ type: SHOW_SUCCESSFUL_SIGNUP, payload: value }),

        setSuccessMessage: (value, successMessage) => dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: { showSuccessMessage: value, successMessage: successMessage }
        })
    }
}

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default SignUpContainer;

