import React, { Component } from "react";

export class AssignGroupMembership extends Component {
  next = event => {
    event.preventDefault();
    this.props.nextStep();
    this.props.handleMembers();
  };

  render() {
    let { employees, toggleMember } = this.props;
    return (
      <React.Fragment>
        {employees.map((employee, index) => {
          return (
            <div key={employee._id}>
              <li onClick={() => toggleMember(index)}>{employee.name}</li>
            </div>
          );
        })}
        <button onClick={this.next}>Next</button>
      </React.Fragment>
    );
  }
}

export default AssignGroupMembership;
