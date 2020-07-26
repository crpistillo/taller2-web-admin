import React from "react";
import Alert from 'react-bootstrap/Alert'

const AdminHeader = props => (
    <Alert variant="secondary">
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>
            {props.headerText}
        </p>
        <hr />
        <p className="mb-0">
            {props.descriptionText}
        </p>
    </Alert>
)

export default AdminHeader;