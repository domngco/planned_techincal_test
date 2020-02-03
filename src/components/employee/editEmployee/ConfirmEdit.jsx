import React, { Component } from "react";
import { Form, Header, Table, List, Button, Grid } from "semantic-ui-react";

export class ConfirmEdit extends Component {
  previous = event => {
    event.preventDefault();
    this.props.previousStep();
  };

  confirm = event => {
    event.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    let { employee } = this.props;
    return (
      <React.Fragment>
        <Header as="h2">Employee Profile Summary</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Job Title</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{employee.firstName}</Table.Cell>
              <Table.Cell>{employee.lastName}</Table.Cell>
              <Table.Cell>{employee.title}</Table.Cell>
              <Table.Cell>{employee.email}</Table.Cell>
              <Table.Cell>{employee.phone}</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Form onSubmit={this.confirm}>
                  <Button onClick={this.previous}>Previous</Button>
                  <Button type="submit">Confirm</Button>
                </Form>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    );
  }
}

export default ConfirmEdit;
