import React, { Component } from "react";
import {connect} from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: "",
            password: ""
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.emailAddress === "uriel") {
            this.props.onClickedLoginButton("urielsinho_token")
        } else {
            this.props.onClickedLoginButton("juliansinho_token")
        }
    }

    render() {
        return (
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
        );
    }
}

const mapStateToProps = (state) => {
    /*Esta linea hay que agregarle .simpleReducer porque es el nombre con el que cree el reducer,
    si hubiera uno solo no hace falta. El state divide el state segun los reducers que haya.*/
    return {token: state.simpleReducer.token}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickedLoginButton: (token) =>{
            dispatch({type: 'ADD_TOKEN', payload: token})  
        }
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;