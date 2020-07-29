import React, {Component} from "react";

import Button from "react-bootstrap/Button";
import {FaPencilAlt, FaTrash} from "react-icons/fa";
import Paper from '@material-ui/core/Paper';
import Table from "react-bootstrap/Table";
import Pagination from "@material-ui/lab/Pagination";


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
      <div style={{flex: 1, alignItems: "center"}}>
        <Paper elevation={10}>
          <Table striped bordered hover variant="light" size="sm" style={{paddingLeft: 5, marginRight: 5}}>
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
                  <td>{user.email}</td>
                  <td>{user.fullname}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.admin ? "Admin" : "User"}</td>
                  <td>
                    <img src={`data:image/png;base64, ${user.photo}`} />
                  </td>
                  <td style={this.helpStyle}>
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
                  </td>
                </tr>
            ))}
            </tbody>
          </Table>
        </Paper>
        <div className="user-pagination">
          <Pagination
              count={this.props.totalPages}
              defaultPage={this.props.page}
              variant="outlined"
              onChange={(e, v) => this.props.setNextPage(v)}
          />
        </div>

      </div>
    );
  }
}

export default UsersTable;
