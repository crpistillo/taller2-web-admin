import React from 'react';
import './App.css';
import SideBar from './common/SideBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

