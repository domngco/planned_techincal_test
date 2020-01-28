import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class UnconnectedEmployee extends Component {
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
  };

  render() {
    return (
      <React.Fragment>
        {this.props.loggedIn ? (
          <div>
            <div>{this.state.employee.name}</div>
            <Link to={"/edit-employee/" + this.props.match.params.id}>
              Edit Employee
            </Link>
          </div>
        ) : (
          <div>{this.state.employee.name}</div>
        )}
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let Employee = connect(mapStateToProps)(UnconnectedEmployee);

export default Employee;
