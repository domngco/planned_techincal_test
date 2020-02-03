import React, { Component } from "react";
import { Form, Header, Grid } from "semantic-ui-react";

export class EditEmployeeDetails extends Component {
  next = event => {
    event.preventDefault();
    this.props.nextStep();
  };

  delete = event => {
    event.preventDefault();
    alert("Are you sure you want to delete this profile?");
    this.props.handleDelete();
  };

  render() {
    let { employee, handleChange } = this.props;
    return (
      <React.Fragment>
        <Header as="h2">Edit Employee Profile</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="First Name"
              onChange={handleChange("firstName")}
              defaultValue={employee.firstName}
            />
            <Form.Input
              placeholder="Last Name"
              onChange={handleChange("lastName")}
              defaultValue={employee.lastName}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Title"
              onChange={handleChange("title")}
              defaultValue={employee.title}
            />
            <Form.Input
              placeholder="Email"
              onChange={handleChange("email")}
              defaultValue={employee.email}
            />
            <Form.Input
              placeholder="Phone"
              onChange={handleChange("phone")}
              defaultValue={employee.phone}
            />
          </Form.Group>
          <Grid style={{ marginTop: "1em" }}>
            <Form.Button onClick={this.next}>Next</Form.Button>
            <Form.Button onClick onClick={this.delete}>
              Delete
            </Form.Button>
          </Grid>
        </Form>
      </React.Fragment>
    );
  }
}

export default EditEmployeeDetails;
