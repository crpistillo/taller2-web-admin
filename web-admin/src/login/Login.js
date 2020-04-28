import React, { Component } from "react";
import { connect } from 'react-redux';
import AlertError from "../common/AlertError";

import { SHOW_EMAIL_ERROR_MESSAGE } from '../redux/loginErrorReducer';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: "",
            password: ""
        }
        this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        this.errorEmailText = "Please, enter a valid email."
    }

    validateEmail() {
        console.log(this.emailRegex.test(this.state.emailAddress))
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
                <AlertError errorText={this.errorEmailText} show={this.props.showEmailError} setShow={this.props.setShowEmailErrorMesage} />
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="text" className="form-control" placeholder="Enter email" onChange={(e) => this.setState({ emailAddress: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label onClick={() => console.log(this.props.token)}>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    /*Esta linea hay que agregarle .simpleReducer porque es el nombre con el que cree el reducer,
    si hubiera uno solo no hace falta. El state divide el state segun los reducers que haya.*/
    return { 
        token: state.simpleReducer.token,
        showEmailError: state.loginErrorReducer.showEmailErrorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickedLoginButton: (token) => dispatch({ type: 'ADD_TOKEN', payload: token }),
        setShowEmailErrorMesage: (value) => {
            console.log("value to set", value)
            dispatch({ type: SHOW_EMAIL_ERROR_MESSAGE, payload: value })
        } 
    }
}


const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;