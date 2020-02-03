import React, { Component } from "react";
import { Form, Header, Grid, TextArea } from "semantic-ui-react";

export class GroupDetails extends Component {
  next = event => {
    event.preventDefault();
    this.props.nextStep();
  };

  render() {
    let { values, handleChange } = this.props;
    return (
      <React.Fragment>
        <Header as="h2">Create Group Profile</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Name"
              onChange={handleChange("name")}
              defaultValue={values.name}
            />
            <Form.Input
              placeholder="Department"
              onChange={handleChange("department")}
              defaultValue={values.department}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={TextArea}
              placeholder="Description"
              onChange={handleChange("description")}
              defaultValue={values.description}
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

export default GroupDetails;
