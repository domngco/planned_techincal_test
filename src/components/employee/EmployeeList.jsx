import React, { Component } from "react";

export class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }

  componentDidMount = () => {
    this.handleEmployees();
  };

  handleEmployees = async () => {
    let response = await fetch("/employee-list");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let allEmployees = body.message;
    this.setState({ employees: allEmployees });
    console.log("allEmployees, ", this.state.employees);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.employees.map((employee, index) => {
            return (
              <div key={index}>
                <div>{employee.name}</div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeList;
