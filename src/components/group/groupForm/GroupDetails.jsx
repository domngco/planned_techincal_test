import React, { Component } from "react";

export class GroupDetails extends Component {
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
            placeholder="Department"
            onChange={handleChange("department")}
            defaultValue={values.department}
          />
          <input
            placeholder="Description"
            onChange={handleChange("description")}
            defaultValue={values.description}
          />
          <button onClick={this.next}>Next</button>
        </form>
      </React.Fragment>
    );
  }
}

export default GroupDetails;
