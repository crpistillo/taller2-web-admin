import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert'

class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(!this.props.loggedIn) return <Redirect to="/sign-in" />
        return (
            <div className="home-wrapper">
                <div className="home-inner">
                    <Alert variant="success">
                        <Alert.Heading>Successful login!</Alert.Heading>
                        <p>
                            Welcome to chotuve application administrator interface. On the left sidebar you
                            will find different application aspects. Click on them to administrate it!
                </p>
                    </Alert>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.appReducer.loggedIn
    }
}

const HomeContainer = connect(mapStateToProps)(Home)

export default HomeContainer;