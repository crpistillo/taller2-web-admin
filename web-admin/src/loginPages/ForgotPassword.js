import React, { Component } from "react";
import { connect } from 'react-redux';

import {
    SHOW_RECOVER_ERROR_MESSAGE, SHOW_RECOVER_SPINNER, SHOW_SUCCESSFUL_RECOVER, forgotPasswordReducer,
    GO_NEW_PASSWORD
} from '../redux/forgotPasswordReducer';

import { Redirect } from 'react-router-dom'

import { RECOVER_PASSWORD_ENDPOINT } from '../vars/endpoints';

import FormContainer from "./FormContainer";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
        };

        this.formFields = [{
            label: 'Email address',
            type: 'text',
            placeholder: 'Enter email to recover your password',
            onChangeAction: (value) => (this.setState({ emailAddress: value }))
        }]

        this.errorEmailText = "Please, review your email."
    }

    setOnSpinner = () => this.props.setSpinner(true)
    setOffSpinner = () => this.props.setSpinner(false)

    generateRequest() {
        let data = {
            email: this.state.emailAddress
        }

        let requestHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        let request = new Request(RECOVER_PASSWORD_ENDPOINT, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(data)
        })

        return request;
    }

    processResponse(response) {
        if (response.ok) {
            response.json().then(json => { console.log(json) })
            this.props.goNewPassword()
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
        console.log(this.props.newPassword)
        if (this.props.newPassword) return <Redirect to="/new_password" />
        return (
            <FormContainer
                formHeader={"Password Recovery"}
                formFields={this.formFields}
                submitButtonText={"Submit"}
                showExtraLink={this.props.showLink}
                errorMessage={this.props.errorMessage}
                showErrorMessage={this.props.showErrorMessage}
                setErrorMessage={this.props.setErrorMessage}
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
        newPassword: state.forgotPasswordReducer.newPassword,
        showErrorMessage: state.forgotPasswordReducer.showErrorMessage,
        errorMessage: state.forgotPasswordReducer.errorMessage,
        showSpinner: state.forgotPasswordReducer.showForgotPasswordSpinner
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setErrorMessage: (value, message) => {
            dispatch({ type: SHOW_RECOVER_ERROR_MESSAGE, payload: { showErrorMessage: value, errorMessage: message } })
        },
        setSpinner: (value) => dispatch({ type: SHOW_RECOVER_SPINNER, payload: value }),

        setSuccessful: (value) => dispatch({ type: SHOW_SUCCESSFUL_RECOVER, payload: value }),

        goNewPassword: (value) => dispatch({ type: GO_NEW_PASSWORD, payload: value })
    }
}

const ForgotPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)

export default ForgotPasswordContainer;

