import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import EditEmployeeDetails from "./EditEmployeeDetails.jsx";
import ConfirmEdit from "./ConfirmEdit.jsx";

export class UnconnectedEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
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

  nextStep = () => {
    let step = this.state.step;
    this.setState({
      step: step + 1
    });
  };

  previousStep = () => {
    let step = this.state.step;
    this.setState({
      step: step - 1
    });
  };

  handleDelete = async () => {
    event.preventDefault();
    let data = new FormData();
    data.append("employeeID", this.props.match.params.id);
    let response = await fetch("/delete-employee", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert(body.message);
      return;
    }
    if (body.success) {
      alert(body.message);
      this.props.history.push("/");
      return;
    }
  };

  handleChange = input => event => {
    event.persist();
    this.setState(prevState => ({
      employee: { ...prevState.employee, [input]: event.target.value }
    }));
  };

  handleSubmit = async () => {
    event.preventDefault();
    if (
      !this.state.employee.email.includes("@") ||
      !this.state.employee.email.includes(".com") ||
      this.state.employee.email.length < 5
    ) {
      alert("Invalid Email");
      return;
    }
    let data = new FormData();
    let employee = this.state.employee;
    data.append("employeeID", this.props.match.params.id);
    data.append("firstName", employee.firstName);
    data.append("lastName", employee.lastName);
    data.append("title", employee.title);
    data.append("email", employee.email);
    data.append("phone", employee.phone);
    let response = await fetch("/edit-employee", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert(body.message);
      return;
    }
    if (body.success) {
      alert(body.message);
      this.props.history.push("/");
      return;
    }
  };

  render() {
    let { step } = this.state;
    let { employee } = this.state;
    let { firstName, lastName, title, email, phone } = this.state.employee;
    let values = { firstName, lastName, title, email, phone };
    switch (step) {
      case 1:
        return (
          <React.Fragment>
            {this.props.loggedIn ? (
              <EditEmployeeDetails
                nextStep={this.nextStep}
                previousStep={this.previousStep}
                handleChange={this.handleChange}
                handleDelete={this.handleDelete}
                employee={employee}
                values={values}
              />
            ) : (
              this.props.history.push("/admin")
            )}
          </React.Fragment>
        );
      case 2:
        return (
          <ConfirmEdit
            previousStep={this.previousStep}
            handleSubmit={this.handleSubmit}
            employee={this.state.employee}
          />
        );
    }
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let Employee = connect(mapStateToProps)(UnconnectedEmployee);

export default withRouter(Employee);
