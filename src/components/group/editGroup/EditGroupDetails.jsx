import React, { Component } from "react";
import { Form, Header, Grid, TextArea } from "semantic-ui-react";

export class EditGroupDetails extends Component {
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
    let { group, handleChange } = this.props;
    return (
      <React.Fragment>
        <Header as="h2">Edit Group Profile</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Name"
              onChange={handleChange("name")}
              defaultValue={group.name}
            />
            <Form.Input
              placeholder="Department"
              onChange={handleChange("department")}
              defaultValue={group.department}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={TextArea}
              placeholder="Description"
              onChange={handleChange("description")}
              defaultValue={group.description}
            />
          </Form.Group>
          <Grid style={{ marginTop: "1em" }}>
            <Form.Button onClick={this.next}>Next</Form.Button>
            <Form.Button onClick={this.delete}>Delete</Form.Button>
          </Grid>
        </Form>
      </React.Fragment>
    );
  }
}

export default EditGroupDetails;
