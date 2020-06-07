import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';

const JumbotronHeader = (props) => (
    <Jumbotron>
        <h4>{props.headerText}</h4>
        <p>
            {props.descriptionText}
        </p>
    </Jumbotron>
)

export default JumbotronHeader;