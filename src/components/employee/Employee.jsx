import React, { Component } from "react";

export class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {}
    };
  }

  componentDidMount = () => {
    this.handleEmployee();
  };

  handleEmployee = async () => {
    let data = new FormData();
    data.append("employeeID", this.props.match.params.id);
    let response = await fetch("/employee", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let _employee = body.message;
    if (!body.success) {
      alert("Unsuccessful, ", body.message);
      return;
    }
    if (body.success) {
      this.setState({ employee: _employee });
      return;
    }
    console.log("employee, ", this.state.employee);
  };

  render() {
    return (
      <React.Fragment>
        <div>{this.state.employee.name}</div>
      </React.Fragment>
    );
  }
}

export default EmployeeList;
