import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddMember from "./AddMember.jsx";
import { Table, Button, Icon, Grid } from "semantic-ui-react";
import _ from "lodash";

export class UnconnectedEditMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
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
    let employees = body.message;
    this.setState({ employees: employees });
    console.log("AddGroupMembers - employees, ", employees);
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
              <Table.HeaderCell>Add</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(
              employees,
              ({ firstName, lastName, title, email, phone, _id }, index) => {
                console.log("employees", employees);
                let member = this.state.employees[index];
                let groupID = this.props.match.params.id;
                return (
                  <Table.Row key={_id}>
                    <Table.Cell>{firstName}</Table.Cell>
                    <Table.Cell>{lastName}</Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell>{email}</Table.Cell>
                    <Table.Cell>{phone}</Table.Cell>
                    <Table.Cell selectable>
                      <Grid centered>
                        <Grid.Row verticalAlign="middle">
                          <AddMember member={member} groupID={groupID} />
                        </Grid.Row>
                      </Grid>
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

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let EditMembers = connect(mapStateToProps)(UnconnectedEditMembers);

export default withRouter(EditMembers);
