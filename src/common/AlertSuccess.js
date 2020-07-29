import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert'

class AlertSuccess extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            fontSize: '17px'
        }
    }

    render() {
        return (
            <Alert show={this.props.show} variant="success" onClose={() => this.props.setShow(false)} dismissible >
                <Alert.Heading>Success</Alert.Heading>
                <p style={this.styles}>
                    {this.props.successText}
                </p>
            </Alert>
        )
    }
}

export default AlertSuccess;