import React, { Component } from "react";
import { connect } from 'react-redux';

import { SHOW_LOGIN_ERROR_MESSAGE } from '../redux/loginErrorReducer';
import GeneralForm from "./GeneralForm";
import { LOGIN_ENDPOINT } from "../vars/endpoints";
import FormContainer from "./FormContainer";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: "",
            password: ""
        }

        this.formFields = [{
            label: 'Email adress',
            type: 'text',
            placeholder: 'Enter email',
            onChangeAction: value => this.setState({ emailAddress: value })
            },
        , {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            onChangeAction: value => (this.setState({ password: value })),
        }]

        this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        this.errorEmailText = "Please, enter a valid email."
    }

    generateRequest(){
        let data = {
            email: this.state.emailAddress,
            password: this.state.password
        }

        let requestHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        let request = new Request(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(data)
        }) 
        
        return request;
    }

    processRequest(request) { 
        fetch(request)
            .then(response => Response.text())
            .then(text => console.log(text))
    }

    render() {
        return (
            <div>
                <FormContainer
                    formHeader="Sign in"
                    formFields={this.formFields}
                    submitButtonText="Submit"
                    extraLinkSuffix="Forgot"
                    extraLinkHref="#"
                    extraLinkText="password?"
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
        showErrorMessage: state.loginErrorReducer.showErrorMessage,
        errorMessage: state.loginErrorReducer.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setErrorMessage: (value, message) => {
            console.log(value, message)
            dispatch({ type: SHOW_LOGIN_ERROR_MESSAGE, payload: {showErrorMessage: value, errorMessage: message} })
        } 
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;