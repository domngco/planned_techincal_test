import React, { Component } from "react";

export class ConfirmEdit extends Component {
  previous = event => {
    event.preventDefault();
    this.props.previousStep();
  };

  confirm = event => {
    event.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    let { employee } = this.props;
    return (
      <React.Fragment>
        <div>Step 2</div>
        <ul>
          <li>Name - {employee.name}</li>
          <li>Title - {employee.title}</li>
          <li>Email - {employee.email}</li>
          <li>Phone - {employee.phone}</li>
        </ul>
        <form onSubmit={this.confirm}>
          <button type="submit">Confirm</button>
          <button onClick={this.previous}>Previous</button>
        </form>
      </React.Fragment>
    );
  }
}

export default ConfirmEdit;
