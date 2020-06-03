import React, { Component } from "react";
import AlertError from "../common/AlertError";
import AlertSuccess from "../common/AlertSuccess";
import WaitingSpinner from "../common/WaitingSpinner";

class GeneralForm extends Component {
  _showExtraLink() {
    if (this.props.showExtraLink) {
      return (
        <p className="forgot-password text-right">
          {this.props.extraLinkSuffix}{" "}
          <a href={this.props.extraLinkHref}>{this.props.extraLinkText}</a>
        </p>
      );
    } else {
      return <div />;
    }
  }

  render() {
    const showExtraLink = this._showExtraLink();
    return (
      <div>
        <AlertError
          errorText={this.props.errorMessage}
          show={this.props.showError}
          setShow={this.props.setErrorMessage}
        />
        <AlertSuccess
          successText={this.props.successMessage}
          show={this.props.showSuccess}
          setShow={this.props.setSuccessMessage}
        />

        <form onSubmit={(e) => this.props.handleSubmit(e)}>
          <h3>{this.props.formHeader}</h3>

          {this.props.formFields.map((formField, index) => (
            <div className="form-group" key={index}>
              <label>{formField.label}</label>
              <input
                type={formField.type}
                className="form-control"
                placeholder={formField.placeholder}
                onChange={(e) => formField.onChangeAction(e.target.value)}
                defaultValue={formField.defaultValue}
                readOnly={formField.readonly !== undefined}
              />
            </div>
          ))}

          <button type="submit" className="btn btn-primary btn-block">
            {this.props.submitButtonText}
          </button>

          {showExtraLink}
        </form>

        <WaitingSpinner activated={this.props.showSpinner} />
      </div>
    );
  }
}

export default GeneralForm;
