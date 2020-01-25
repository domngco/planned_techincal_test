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
          <li>Department - {values.department}</li>
          <li>Description - {values.description}</li>
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
