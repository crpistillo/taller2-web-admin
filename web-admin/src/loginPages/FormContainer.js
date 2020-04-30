import React, { Component } from "react";

import GeneralForm from './GeneralForm';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    }

    validateEmail() {
        console.log(this.props.emailAddress)
        return this.emailRegex.test(this.props.emailAddress)
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.validateEmail()) {
            this.props.setErrorMessage(true, this.props.errorEmailText)
        } else {
            let request = this.props.generateRequest()
            this.props.processRequest(request)
        }
    }

    render() {
        return (
            <div>
                <GeneralForm
                    formHeader={this.props.formHeader}
                    handleSubmit={this.handleSubmit.bind(this)}
                    formFields={this.props.formFields}
                    submitButtonText={this.props.submitButtonText}
                    extraLinkSuffix={this.props.extraLinkSuffix}
                    extraLinkHref={this.props.extraLinkHref}
                    extraLinkText={this.props.extraLinkText}
                    errorMessage={this.props.errorMessage}
                    showError={this.props.showErrorMessage}
                    setErrorMessage={this.props.setErrorMessage} />
            </div>
        );
    }
}

export default FormContainer;