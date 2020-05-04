import React, { Component } from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import JumbotronHeader from '../JumbotronHeader';
import SignUpContainer from '../../loginPages/SignUp';

import { connect } from 'react-redux';

import { SHOW_SUCCESSFUL_SIGNUP } from '../../redux/signUpReducer';

class AddUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showSuccessMessage: false
        };

        this.headerText = "Create user in database";
        this.descriptionText = "In order to create a user in the database, please fill the following form.\
                                After sending it, a user of the main application will be able to log-in \
                                with the specified credentials";
    }

    closeSuccessMessage() {
        this.setState({ showSuccessMessage: false })
    }

    _successMessage() {
        return (
            <div className="home-inner">
                <Alert variant="success" show={this.props.success} onClose={() => this.props.setSuccessful(false)} dismissible>
                    <Alert.Heading>Successful creation!</Alert.Heading>
                    <p>
                        User created correctly. Now, try to login with the specified credentials in the main app! 
                    </p>
                </Alert>
            </div>
        )
    }


    render() {
        const successMessage = this._successMessage()
        return (
            <Row>
                <JumbotronHeader headerText={this.headerText} descriptionText={this.descriptionText}/>
                <Col xs={6}>
                    <SignUpContainer text={"Create user in database"} showLink={false} />
                </Col>
                <Col xs={6}>
                    {successMessage}
                </Col>


            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.signUpReducer.success
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSuccessful: (value) => dispatch( {type: SHOW_SUCCESSFUL_SIGNUP, payload: value})
    }
}

const AddUserContainer = connect(mapStateToProps, mapDispatchToProps)(AddUser)

export default AddUserContainer;