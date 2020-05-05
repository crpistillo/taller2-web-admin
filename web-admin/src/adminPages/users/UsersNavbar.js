import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";


const UsersNavbar = (props) => (
    <ListGroup variant="flush">
        <ListGroup.Item>
            <Link to="/users/add">Add user</Link>
        </ListGroup.Item>
        <ListGroup.Item>
            <Link to="/users/list/1">List users</Link>
        </ListGroup.Item>
    </ListGroup>
);

export default UsersNavbar;
