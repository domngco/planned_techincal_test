import React, { Component } from "react";

export class EmployeeDetails extends Component {
  next = event => {
    event.preventDefault();
    this.props.nextStep();
  };

  render() {
    let { values, handleChange } = this.props;
    return (
      <React.Fragment>
        <div>Step 1</div>
        <form>
          <input
            placeholder="Name"
            onChange={handleChange("name")}
            defaultValue={values.name}
          />
          <input
            placeholder="Title"
            onChange={handleChange("title")}
            defaultValue={values.title}
          />
          <input
            placeholder="email"
            onChange={handleChange("email")}
            defaultValue={values.email}
          />
          <input
            placeholder="Phone"
            onChange={handleChange("phone")}
            defaultValue={values.phone}
          />
          <button onClick={this.next}>Next</button>
        </form>
      </React.Fragment>
    );
  }
}

export default EmployeeDetails;
