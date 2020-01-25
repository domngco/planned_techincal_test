import React, { Component } from "react";

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
        <div>Step 2</div>
        <ul>
          <li>Name - {values.name}</li>
          <li>Title - {values.title}</li>
          <li>Email - {values.email}</li>
          <li>Phone - {values.phone}</li>
        </ul>
        <form onSubmit={this.confirm}>
          <button type="submit">Confirm</button>
          <button onClick={this.previous}>Previous</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Confirm;
