import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUpContainer from "./loginPages/SignUp";
import NavigatorContainer from './Navigator';
import LoginContainer from './loginPages/Login';
import HomeContainer from './adminPages/Home';

function App() {
  return (<Router>
    <div className="App">
      <NavigatorContainer />


      <Switch>
        <Route exact path='/' component={LoginContainer} />
        <Route path="/sign-in" component={LoginContainer} />
        <Route path="/sign-up" component={SignUpContainer} />
        <Route path="/home" component={HomeContainer} />
      </Switch>


    </div>
  </Router>
  );
}

export default App;