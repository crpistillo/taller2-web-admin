import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useHistory, withRouter } from "react-router-dom";
import styles from './../styles.css'

class SideBar extends React.Component {    
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky"></div>
                <Nav.Item id="borderbottom">
                    <Nav.Link  onClick={() => this.props.history.push("/login")}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => this.props.history.push("/users")}>Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => this.props.history.push("/media-server")}>Media Server</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}

const SideBis = withRouter(SideBar);

export default SideBis;