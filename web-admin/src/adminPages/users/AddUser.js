import React, { Component } from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import JumbotronHeader from '../JumbotronHeader';
import FormContainer from '../../loginPages/FormContainer';

class AddUser extends Component {
    constructor(props) {
        super(props)
        this.headerText = "Create user in database";
        this.descriptionText = "In order to create a user in the database, please fill the following form.\
                                After sending it, a user of the main application will be able to log-in \
                                with the specified credentials";
        this.formFields = [{
            label: 'User email address',
            type: 'text',
            placeholder: 'User email',
            onChangeAction: (value) => (this.setState({ emailAddress: value }))
        }, {
            label: 'User password',
            type: 'password',
            placeholder: 'Enter user password',
            onChangeAction: (value) => (this.setState({ password: value }))
        }, {
            label: 'User full name',
            type: 'text',
            placeholder: 'Full name',
            onChangeAction: (value) => (this.setState({ fullName: value })),
        }]
    }
    render() {
        return (
            <Row>
                <JumbotronHeader headerText={this.headerText} descriptionText={this.descriptionText} />
                <FormContainer
                    formHeader="Create user"
                    formFields={this.formFields}
                    submitButtonText="Submit"
                    showErrorMessage={false}
                />
                    
            </Row>
        )
    }
}

export default AddUser;