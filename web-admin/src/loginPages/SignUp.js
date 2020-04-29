import React, { Component } from "react";
import { connect } from 'react-redux';

import { SHOW_EMAIL_SIGNUP_ERROR_MESSAGE } from '../redux/signUpErrorReducer';


import GeneralForm from "./GeneralForm";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
        };

        this.formFields = [{
            label: 'First name',
            type: 'text',
            placeholder: 'First name',
            onChangeAction: (value) => (this.setState({ firstName: value })),
        }, {
            label: 'Last name',
            type: 'text',
            placeholder: 'Last name',
            onChangeAction: (value) => (this.setState({ lastName: value })),
        }, {
            label: 'Email address',
            type: 'text',
            placeholder: 'Enter email',
            onChangeAction: (value) => (this.setState({ emailAddress: value }))
        }, {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            onChangeAction: (value) => (this.setState({ password: value }))
        }]
        
        this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        this.errorEmailText = "Please, review your email."
    }

    validateEmail() {
        return this.emailRegex.test(this.state.emailAddress)
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.validateEmail()) {
            this.props.setShowEmailErrorMesage(true)
        }
    }

    render() {
        return (
            <div>
                <GeneralForm
                    formHeader="Sign up"
                    handleSubmit={this.handleSubmit.bind(this)}
                    formFields={this.formFields}
                    submitButtonText="Sign up"
                    extraLinkSuffix="Already registered"
                    extraLinkHref="/sign-in"
                    extraLinkText="sign in?"
                    errorEmailText={this.errorEmailText}
                    showEmailError={this.props.showEmailError}
                    setShowEmailErrorMesage={this.props.setShowEmailErrorMesage} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showEmailError: state.signUpErrorReducer.showEmailErrorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowEmailErrorMesage: (value) => dispatch({ type: SHOW_EMAIL_SIGNUP_ERROR_MESSAGE, payload: value})
    }
}

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default SignUpContainer;

