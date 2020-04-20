import React from 'react';
import './App.css';
import SideBar from './common/SideBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter } from "react-router-dom";
import Login from './login/Login';
import styles from './styles.css';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <SideBar />
      </BrowserRouter>

    );
  }
}

export default App;

