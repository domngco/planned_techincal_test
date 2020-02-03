import React, { Component } from "react";
import { Form, Header, Table, List, Button, Grid } from "semantic-ui-react";

export class Confirm extends Component {
  previous = event => {
    event.preventDefault();
    this.props.previousStep();
  };

  confirm = event => {
    event.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    let { values } = this.props;
    return (
      <React.Fragment>
        <Header as="h2">Group Summary</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{values.name}</Table.Cell>
              <Table.Cell>{values.department}</Table.Cell>
              <Table.Cell>{values.description}</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Form onSubmit={this.confirm}>
                  <Button type="submit">Confirm</Button>
                  <Button onClick={this.previous}>Previous</Button>
                </Form>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    );
  }
}

export default Confirm;
