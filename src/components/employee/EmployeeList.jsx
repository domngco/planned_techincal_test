import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";

export class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      column: null,
      direction: null
    };
  }

  componentDidMount() {
    this.handleEmployees();
  }

  handleEmployees = async () => {
    let response = await fetch("/employee-list");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let allEmployees = body.message;
    this.setState({ employees: allEmployees });
    
  };

  handleSort = clickedColumn => () => {
    const { column, employees, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        employees: _.sortBy(employees, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }
    this.setState({
      employees: employees.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, employees, direction } = this.state;
    return (
      <React.Fragment>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "firstName" ? direction : null}
                onClick={this.handleSort("firstName")}
              >
                First Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "lastName" ? direction : null}
                onClick={this.handleSort("lastName")}
              >
                Last Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "title" ? direction : null}
                onClick={this.handleSort("title")}
              >
                Job Title
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "email" ? direction : null}
                onClick={this.handleSort("email")}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "phone" ? direction : null}
                onClick={this.handleSort("phone")}
              >
                Phone Number
              </Table.HeaderCell>
              <Table.HeaderCell>Details</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(
              employees,
              ({ firstName, lastName, title, email, phone, _id }) => {
                return (
                  <Table.Row key={_id}>
                    <Table.Cell>{firstName}</Table.Cell>
                    <Table.Cell>{lastName}</Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell>{email}</Table.Cell>
                    <Table.Cell>{phone}</Table.Cell>
                    <Table.Cell selectable>
                      <Link to={"/employee/" + _id}>Learn More</Link>
                    </Table.Cell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default EmployeeList;
