import React, { Component } from "react";

import Spinner from 'react-bootstrap/Spinner'

class WaitingSpinner extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            display: 'flex',
            justifyContent: 'center'
        }
    }

    render() {
        return this.props.activated ?
            (
                <div style={this.styles}>
                    <Spinner animation="border" variant={this.props.variant} style={this.styles} />
                </div>) :
            (<div />)

    }
}

export default WaitingSpinner;