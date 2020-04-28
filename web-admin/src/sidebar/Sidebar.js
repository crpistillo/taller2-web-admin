import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'

class Sidebar extends Component {
    showSettings(event) {
        event.preventDefault();
    }
    render() {
        return (
            <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="users" className="menu-item" href="/users">Users</a>
                <a id="media-server" className="menu-item" href="/media">Media</a>
            </Menu>
        );
    }
}

export default Sidebar;