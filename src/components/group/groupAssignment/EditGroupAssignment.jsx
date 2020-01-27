import React, { Component } from "react";

export class EditGroupAssignment extends Component {
  confirm = event => {
    event.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    let { employees, handleAssignment } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.confirm}>
          <div>
            {employees.map((employee, index) => {
              return (
                <div key={employee._id}>
                  <div>{employee.name}</div>
                  <div>{employee.member}</div>
                  <button onClick={() => handleAssignment(index)}>
                    Add To Group
                  </button>
                </div>
              );
            })}
          </div>
          <button type="submit">Confirm</button>
        </form>
      </React.Fragment>
    );
  }
}

export default EditGroupAssignment;
