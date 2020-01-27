import React, { Component } from "react";

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
        <div>Step 1</div>
        <form>
          <input
            placeholder="Name"
            onChange={handleChange("name")}
            defaultValue={group.name}
          />
          <input
            placeholder="Department"
            onChange={handleChange("department")}
            defaultValue={group.department}
          />
          <input
            placeholder="Description"
            onChange={handleChange("description")}
            defaultValue={group.description}
          />
          <button onClick={this.next}>Next</button>
        </form>
        <button onClick={this.delete}>Delete</button>
      </React.Fragment>
    );
  }
}

export default EditGroupDetails;
