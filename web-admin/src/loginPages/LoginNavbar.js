import React from 'react';
import CommonNavbar from '../common/CommonNavbar';

const LoginNavbar = (props) => (
      <CommonNavbar chotuveLink="/sign-in" links={[{
        redirectLink: "/sign-in",
        linkText: "Login"
      }, {
        redirectLink: "/sign-up",
        linkText: "Sign up"
      }]} />
);

export default LoginNavbar;