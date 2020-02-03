import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Divider, Header, Icon, Table, Button } from "semantic-ui-react";

export class UnconnectedEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {}
    };
  }

  componentDidMount() {
    this.handleEmployee();
  }

  handleEmployee = async () => {
    let data = new FormData();
    data.append("employeeID", this.props.match.params.id);
    let response = await fetch("/employee", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let _employee = body.message;
    if (!body.success) {
      alert("Unsuccessful, ", body.message);
      return;
    }
    if (body.success) {
      this.setState({ employee: _employee });
      return;
    }
  };

  render() {
    const { employee } = this.state;
    return (
      <React.Fragment>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="user circle outline" />
            Employee Details
          </Header>
        </Divider>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>First Name</Table.Cell>
              <Table.Cell>{employee.firstName}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3}>Last Name</Table.Cell>
              <Table.Cell>{employee.lastName}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3}>Job Title</Table.Cell>
              <Table.Cell>{employee.title}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3}>Email</Table.Cell>
              <Table.Cell>{employee.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3}>Phone</Table.Cell>
              <Table.Cell>{employee.phone}</Table.Cell>
            </Table.Row>
          </Table.Body>
          {this.props.loggedIn ? (
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    primary
                    size="small"
                    as={Link}
                    to={"/edit-employee/" + employee._id}
                  >
                    <Icon name="edit outline" />
                    Edit
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          ) : (
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    primary
                    size="small"
                    as={Link}
                    to={"/employee-list"}
                  >
                    <Icon name="arrow alternate circle left outline" />
                    Back
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          )}
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

let Employee = connect(mapStateToProps)(UnconnectedEmployee);

export default Employee;
