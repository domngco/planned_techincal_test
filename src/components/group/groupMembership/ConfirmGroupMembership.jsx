import React, { Component } from "react";

export class ConfirmGroupMembership extends Component {
  previous = event => {
    event.preventDefault();
    this.props.previousStep();
  };

  confirm = event => {
    event.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.previous}>Previous</button>
        <button onClick={this.confirm}>Confirm</button>
      </React.Fragment>
    );
  }
}

export default ConfirmGroupMembership;
