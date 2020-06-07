import React, { Component } from 'react';
import CommonNavbar from '../common/CommonNavbar';

class LoginNavbar extends Component {
  render() {
    return (
      <CommonNavbar chotuveLink="/sign-in" links={[{
        redirectLink: "/sign-in",
        linkText: "Login"
      }, {
        redirectLink: "/sign-up",
        linkText: "Sign up"
      }]} />
    );
  }
}

export default LoginNavbar;