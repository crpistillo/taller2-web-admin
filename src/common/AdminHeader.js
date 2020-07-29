import React from "react";
import Alert from 'react-bootstrap/Alert'
import CustomTypography from "./CustomTypography";

const AdminHeader = props => (
    <Alert variant="secondary">
        <Alert.Heading>
            <CustomTypography overlineText={props.title} />
        </Alert.Heading>
        <p>
            <CustomTypography overlineText={props.headerText} />
        </p>
        <hr />
        <p className="mb-0">
            {props.descriptionText}
        </p>
    </Alert>
)

export default AdminHeader;