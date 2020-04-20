import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import styles from './../styles.css'

class SideBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" className={styles.container}>
                <Navbar.Brand>Options</Navbar.Brand>
                <Nav className="mr-auto" >
                    <Link className="Nav.Link" to="/login">
                        Login
                    </Link>
                    <Link className="Nav.Link" to="/users" className={styles.padding15px}>
                        Users
                    </Link>
                </Nav>
            </Navbar>
        )
    }
}

export default SideBar;