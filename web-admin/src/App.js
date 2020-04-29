import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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


import SignUp from "./login/signUpForm";
import NavigatorContainer from './Navigator';
import LoginContainer from './login/Login';
import Sidebar from './sidebar/Sidebar';

function App() {
  return (<Router>
    {/* <div>
      <Sidebar></Sidebar>
    </div> */}
    <div className="App">
      <NavigatorContainer />

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={LoginContainer} />
            <Route path="/sign-in" component={LoginContainer} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;