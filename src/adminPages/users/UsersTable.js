import React, {Component} from "react";

import Button from "react-bootstrap/Button";
import {FaPencilAlt, FaTrash} from "react-icons/fa";
import CustomPagination from "../../common/CustomPagination";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from "react-bootstrap/Table";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


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
