import React, { Component } from "react";

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
        <div>Step 1</div>
        <form>
          <input
            placeholder="Name"
            onChange={handleChange("name")}
            defaultValue={employee.name}
          />
          <input
            placeholder="Title"
            onChange={handleChange("title")}
            defaultValue={employee.title}
          />
          <input
            placeholder="email"
            onChange={handleChange("email")}
            defaultValue={employee.email}
          />
          <input
            placeholder="Phone"
            onChange={handleChange("phone")}
            defaultValue={employee.phone}
          />
          <button onClick={this.next}>Next</button>
        </form>
        <button onClick={this.delete}>Delete</button>
      </React.Fragment>
    );
  }
}

export default EditEmployeeDetails;
