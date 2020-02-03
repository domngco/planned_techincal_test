import React, { Component } from "react";
import { Form, Header, Grid } from "semantic-ui-react";

export class EmployeeDetails extends Component {
  next = event => {
    event.preventDefault();
    this.props.nextStep();
  };

  render() {
    let { values, handleChange } = this.props;
    return (
      <React.Fragment>
        <Header as="h2">Create Employee Profile</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="First Name"
              onChange={handleChange("firstName")}
              defaultValue={values.firstName}
            />
            <Form.Input
              placeholder="Last Name"
              onChange={handleChange("lastName")}
              defaultValue={values.lastNames}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Title"
              onChange={handleChange("title")}
              defaultValue={values.title}
            />
            <Form.Input
              placeholder="Email"
              onChange={handleChange("email")}
              defaultValue={values.email}
            />
            <Form.Input
              placeholder="Phone"
              onChange={handleChange("phone")}
              defaultValue={values.phone}
            />
          </Form.Group>
          <Grid style={{ marginTop: "1em" }}>
            <Form.Button onClick={this.next}>Next</Form.Button>
          </Grid>
        </Form>
      </React.Fragment>
    );
  }
}

export default EmployeeDetails;
