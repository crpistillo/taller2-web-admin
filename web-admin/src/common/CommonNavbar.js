import  React from 'react';
import { Link } from "react-router-dom";

const CommonNavbar = (props) => (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={props.chotuveLink}>chotuve-admin</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
                {props.links.map((link, index) => (
                    <li className="nav-item">
                        <Link className="nav-link" to={link.redirectLink} onClick={link.onClick}>{link.linkText}</Link>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
);

export default CommonNavbar;