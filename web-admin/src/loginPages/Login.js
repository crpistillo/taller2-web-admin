import React, { Component } from "react";
import { connect } from 'react-redux';

import { SHOW_LOGIN_EMAIL_ERROR_MESSAGE } from '../redux/loginErrorReducer';
import GeneralForm from "./GeneralForm";

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

    validateEmail() {
        return this.emailRegex.test(this.state.emailAddress)
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.validateEmail()) {
            this.props.setShowEmailErrorMesage(true);
        }
    }

    render() {
        return (
            <div>
                <GeneralForm
                    formHeader="Sign in"
                    handleSubmit={this.handleSubmit.bind(this)}
                    formFields={this.formFields}
                    submitButtonText="Submit"
                    extraLinkSuffix="Forgot"
                    extraLinkHref="#"
                    extraLinkText="password?"
                    errorEmailText={this.errorEmailText}
                    showEmailError={this.props.showEmailError}
                    setShowEmailErrorMesage={this.props.setShowEmailErrorMesage} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showEmailError: state.loginErrorReducer.showEmailErrorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowEmailErrorMesage: (value) => dispatch({ type: SHOW_LOGIN_EMAIL_ERROR_MESSAGE, payload: value })
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;