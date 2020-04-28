import React, { Component } from "react";

export default class SignUp extends Component {
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
            onChangeAction: (value) => (this.setState({firstName: value})),
        }, {
            label: 'Last name',
            type: 'text',
            placeholder: 'Last name',
            onChangeAction: (value) => (this.setState({lastName: value})),
        }, {
            label: 'Email address',
            type: 'email',
            placeholder: 'Enter email',
            onChangeAction: (value) => (this.setState({emailAddress: value}))
        }, {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            onChangeAction: (value) => (this.setState({password: value}))
        }]
    }

    /*validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }*/

    handleSubmit() {
        console.log("first name", this.state.firstName)
        console.log("last name", this.state.lastName)
        console.log("email addres" ,this.state.emailAddress)
        console.log("password", this.state.password)
    }

    render() {  
        return (
            <form onSubmit={this.handleSubmit()}>
                <h3>Sign Up</h3>
                
                {this.formFields.map((formField, index) => (
                <div className="form-group" key={index}>
                    <label>{formField.label}</label>
                    <input type={formField.type} className="form-control" placeholder={formField.placeholder}
                         onChange={(e) => formField.onChangeAction(e.target.value)} />
                </div>
                ))}

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}