import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUpContainer from "./loginPages/SignUp";
import NavigatorContainer from './Navigator';
import LoginContainer from './loginPages/Login';
import HomeContainer from './adminPages/Home';
import UsersHomeContainer from './adminPages/users/UsersHome';
import ForgotPasswordContainer from './loginPages/ForgotPassword';
import NewPasswordContainer from './loginPages/NewPassword';
import StatsDashboardContainer from "./adminPages/stats/Dashboard";

function App() {
  return (<Router>
    <div className="App">
      <NavigatorContainer />

      <Switch>
        <Route exact path='/' component={LoginContainer} />
        <Route path="/sign-in" component={LoginContainer} />
        <Route path="/sign-up">
          <SignUpContainer text={"Sign up"} hasToShowMessage={true} showLink={true} />
        </Route>
        <Route path="/home" component={HomeContainer} />
        <Route path="/users" component={UsersHomeContainer} />
        <Route path="/stats" component={StatsDashboardContainer} />
        <Route path="/forgot_password" component={ForgotPasswordContainer} />
        <Route path="/new_password" component={NewPasswordContainer} />
      </Switch>


    </div>
  </Router>
  );
}

export default App;