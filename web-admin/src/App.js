import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/*
import SideBar from './common/SideBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginPage from './login/Login';
import styles from './styles.css';
import Container from 'react-bootstrap/Container';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  render() {
    return (
      <Router>

        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <SideBar />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <Switch>
              <Route path="/login">
                <LoginPage setAuth={() => this.setState({ isAuthenticated: true })} />
              </Route>
            </Switch>
          </Col>
        </Row>

      </Router>

    );
  }
}

export default App;

*/


import Login from "./login/loginForm";
import SignUp from "./login/signUpForm";

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>chotuve-admin</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;