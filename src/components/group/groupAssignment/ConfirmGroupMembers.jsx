import React, { Component } from "react";

export class ConfirmGroupMembers extends Component {
  previous = event => {
    event.preventDefault();
    this.props.previousStep();
  };

  confirm = event => {
    event.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    let { members } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.confirm}>
          <div>
            {members.map(member => {
              return (
                <div key={member._id}>
                  <div>{member.name}</div>
                  <div>{member.member}</div>
                </div>
              );
            })}
          </div>
          <button type="submit">Confirm</button>
          <button onClick={this.previous}>Previous</button>
        </form>
      </React.Fragment>
    );
  }
}

export default ConfirmGroupMembers;
