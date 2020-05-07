import React, { Component } from "react";
import { connect } from 'react-redux';

import {
    SHOW_NEWPASS_ERROR_MESSAGE, SHOW_NEWPASS_SPINNER, SHOW_SUCCESSFUL_NEWPASS,
    GO_LOGIN
} from '../redux/newPasswordReducers';

import { NEW_PASSWORD_ENDPOINT } from '../vars/endpoints';

import FormContainer from "./FormContainer";

class NewPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
            recoverToken: '',
            new_target_password: ''
        };

        this.formFields = [{
            label: 'Email address',
            type: 'text',
            placeholder: 'Enter email to recover your password',
            onChangeAction: (value) => (this.setState({ emailAddress: value }))
        },
        {
            label: 'Token',
            type: 'password',
            placeholder: 'Enter recieved token',
            onChangeAction: (value) => (this.setState({ recoverToken: value }))
        },
        {
            label: 'New Password',
            type: 'text',
            placeholder: 'Type your new password',
            onChangeAction: (value) => (this.setState({ new_target_password: value }))
        }]
        this.errorEmailText = "Please, review your email."
    }

    setOnSpinner = () => this.props.setSpinner(true)
    setOffSpinner = () => this.props.setSpinner(false)

    generateRequest() {
        let data = {
            email: this.state.emailAddress,
            token: this.state.recoverToken,
            new_password: this.state.new_target_password
        }

        let requestHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        let request = new Request(NEW_PASSWORD_ENDPOINT, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(data)
        })

        return request;
    }

    processResponse(response) {
        console.log(response)
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
            <div>
                <FormContainer
                    formHeader={"Password Recovery"}
                    formFields={this.formFields}
                    submitButtonText={"Submit"}
                    showExtraLink={this.props.showLink}
                    errorMessage={this.props.errorMessage}
                    showErrorMessage={this.props.showErrorMessage}
                    setErrorMessage={this.props.setErrorMessage}
                    showSuccessMessage={this.props.showErrorMessage}
                    errorEmailText={this.errorEmailText}
                    generateRequest={this.generateRequest.bind(this)}
                    emailAddress={this.state.emailAddress}
                    showSpinner={this.props.showSpinner}
                    setOnSpinner={this.setOnSpinner.bind(this)}
                    processResponse={this.processResponse.bind(this)} />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        newPassword: state.newPasswordReducer.newPassword,
        showErrorMessage: state.newPasswordReducer.showErrorMessage,
        errorMessage: state.newPasswordReducer.errorMessage,
        showSpinner: state.newPasswordReducer.showNewPasswordSpinner
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setErrorMessage: (value, message) => {
            dispatch({ type: SHOW_NEWPASS_ERROR_MESSAGE, payload: { showErrorMessage: value, errorMessage: message } })
        },
        setSpinner: (value) => dispatch({ type: SHOW_NEWPASS_SPINNER, payload: value }),

        setSuccessful: (value) => dispatch({ type: SHOW_SUCCESSFUL_NEWPASS, payload: value }),
    }
}

const NewPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(NewPassword)

export default NewPasswordContainer;

