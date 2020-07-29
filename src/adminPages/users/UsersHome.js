import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import UsersNavbar from "./UsersNavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddUserContainer from "./AddUser";
import UsersListContainer from "./UsersList";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class UsersHome extends Component {
  _successMessage() {
    return(
        <Snackbar open={this.props.success} autoHideDuration={6000}
                  anchorOrigin={{vertical: "top", horizontal: "right"}}
                  onClose={() => this.props.setSuccessful(false)}>
          <MuiAlert elevation={6} variant="filled" onClose={() => this.props.setSuccessful(false)} severity="success">
            User created successfully!
          </MuiAlert>
        </Snackbar>
    );
  }
  render() {
    if (!this.props.loggedIn) return <Redirect to="/sign-in" />;


    return (
      <div style={{paddingBottom: 50}}>
        <Container fluid>
          <Row className="row-inversion padding-top-100-px padding-left-100-px">
            <Col xs={2}>
              <UsersNavbar />
            </Col>
            <Col xs={10}>
              <Switch>
                <Route
                  exact
                  path="/users"
                  render={() => <Redirect to="/users/list" />}
                />
                <Route path="/users/list" component={UsersListContainer} />
                <Route path="/users/add" component={AddUserContainer} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.appReducer.loggedIn,
    isLoadingUsers: !state.listUsersReducer.alreadyFetched
  };
};

const UsersHomeContainer = connect(mapStateToProps)(UsersHome);

export default UsersHomeContainer;
