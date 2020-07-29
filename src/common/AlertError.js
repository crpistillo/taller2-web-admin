import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert'

class AlertError extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            fontSize: '17px'
        }
    }

    render() {
        return (
            <Alert show={this.props.show} variant="danger" onClose={() => this.props.setShow(false)} dismissible >
                <Alert.Heading>Error</Alert.Heading>
                <p style={this.styles}>
                    {this.props.errorText}
                </p>
            </Alert>
        )
    }
}

export default AlertError;