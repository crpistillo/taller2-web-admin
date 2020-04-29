import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    showSettings(event) {
        event.preventDefault();
    }
    render() {
        return (
            <Menu>
                <Link className="nav-link" to={"/"}>Home</Link>
                <Link className="nav-link" to={"/users"}>Users</Link>
                <Link className="nav-link" to={"/media"}>Media</Link>
            </Menu>
        );
    }
}

export default Sidebar;