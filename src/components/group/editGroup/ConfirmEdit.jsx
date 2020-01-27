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
    let { group } = this.props;
    return (
      <React.Fragment>
        <div>Step 2</div>
        <ul>
          <li>Name - {group.name}</li>
          <li>Department - {group.department}</li>
          <li>Description - {group.description}</li>
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
