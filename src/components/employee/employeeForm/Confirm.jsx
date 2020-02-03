import React, { Component } from "react";
import { Form, Header, List, Grid } from "semantic-ui-react";

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
        <Header as="h2">Submit Employee Profile</Header>
        <List divided verticalAlign="middle">
          <List.Item>
            <List.Content>
              <List.Header as="h5">First Name - {values.firstName}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as="h5">Last Name - {values.lastName}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as="h5">Title - {values.title}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as="h5">Email - {values.email}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as="h5">Phone - {values.phone}</List.Header>
            </List.Content>
          </List.Item>
        </List>
        <Form.Group onSubmit={this.confirm}>
          <Grid style={{ marginTop: "1em" }}>
            <Form.Button onClick={this.previous}>Previous</Form.Button>
            <Form.Button type="submit">Confirm</Form.Button>
          </Grid>
        </Form.Group>
      </React.Fragment>
    );
  }
}

export default Confirm;
