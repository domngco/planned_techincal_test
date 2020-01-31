import React, { Component } from "react";

export class ViewGroupMembership extends Component {
  next = event => {
    event.preventDefault();
    this.props.nextStep();
  };
  previous = event => {
    event.preventDefault();
    this.props.previousStep();
  };

  render() {
    let { members } = this.props;
    return (
      <React.Fragment>
        <React.Fragment>
          {members.map((member, index) => {
            return (
              <div key={member._id}>
                <li>{member.name}</li>
              </div>
            );
          })}
          <button onClick={this.next}>Next</button>
          <button onClick={this.previous}>Previous</button>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default ViewGroupMembership;
