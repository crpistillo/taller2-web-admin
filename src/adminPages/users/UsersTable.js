import React, {Component} from "react";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {FaPencilAlt, FaTrash} from "react-icons/fa";
import CustomPagination from "../../common/CustomPagination";

class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.helpStyle = {
      display: "flex",
      justifyContent: "space-between",
    };
  }

  changePage(page) {
    this.props.setNextPage(page);
  }

  render() {
    return (
      <div>
        <Table striped bordered hover variant="light" size="sm">
          <thead>
            <tr>
              <th>Email adress</th>
              <th>Fullname</th>
              <th>Phone number</th>
              <th>Type</th>
              <th>Photo</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user) => (
              <tr>
                <th>{user.email}</th>
                <th>{user.fullname}</th>
                <th>{user.phone_number}</th>
                <th>{user.admin ? "Admin" : "User"}</th>
                <th>
                  <img src={`data:image/png;base64, ${user.photo}`} />
                </th>
                <th style={this.helpStyle}>
                  <Button
                    variant="success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                    onClick={() => this.props.clickEditButton(user.email)}
                  >
                    <FaPencilAlt />
                  </Button>
                  <Button
                    variant="danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    onClick={() => this.props.clickDeleteButton(user.email)}
                  >
                    <FaTrash />
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>

        <CustomPagination page={this.props.page} changePage={this.changePage.bind(this)} totalPages={this.props.totalPages} />
      </div>
    );
  }
}

export default UsersTable;
