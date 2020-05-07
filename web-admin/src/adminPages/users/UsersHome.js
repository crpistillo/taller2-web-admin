import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import UsersNavbar from './UsersNavbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AddUserContainer from './AddUser';
import UsersListContainer from './UsersList';


class UsersHome extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(!this.props.loggedIn) return <Redirect to="/sign-in" />

        return (
            <div className="admin-page-wrapper">
                <Container fluid className="occupy-whole-height">
                    <Row className="row-inversion padding-top-100-px padding-left-100-px"  >
                        <Col xs={2}>
                            <UsersNavbar />
                        </Col>
                        <Col xs={10}>
                            <Switch>
                                <Route exact path="/users" render={() => <Redirect to="/users/add" />} />
                                <Route path="/users/add" component={AddUserContainer} />
                                <Route path="/users/list" component={UsersListContainer} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.appReducer.loggedIn
    }
}

const UsersHomeContainer = connect(mapStateToProps)(UsersHome)

export default UsersHomeContainer;