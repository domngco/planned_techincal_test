import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import EmployeeDetails from "./EmployeeDetails.jsx";
import Confirm from "./Confirm.jsx";

class UnconnectedEmployeeForm extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      name: "",
      title: "",
      email: "",
      phone: ""
    };
  }

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

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleSubmit = async () => {
    event.preventDefault();
    if (
      !this.state.email.includes("@") ||
      !this.state.email.includes(".com") ||
      this.state.email.length < 5
    ) {
      alert("Invalid Email");
      return;
    }
    let data = new FormData();
    data.append("name", this.state.name);
    data.append("title", this.state.title);
    data.append("email", this.state.email);
    data.append("phone", this.state.phone);
    let response = await fetch("/add-employee", {
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
      this.props.history.push("/employee-list");
      return;
    }
  };

  render() {
    let { step } = this.state;
    let { name, title, email, phone } = this.state;
    let values = { name, title, email, phone };
    switch (step) {
      case 1:
        return (
          <React.Fragment>
            {this.props.loggedIn ? (
              <EmployeeDetails
                nextStep={this.nextStep}
                previousStep={this.previousStep}
                handleChange={this.handleChange}
                values={values}
              />
            ) : (
              this.props.history.push("/admin")
            )}
          </React.Fragment>
        );
      case 2:
        return (
          <Confirm
            previousStep={this.previousStep}
            handleSubmit={this.handleSubmit}
            values={values}
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

let EmployeeForm = connect(mapStateToProps)(UnconnectedEmployeeForm);
export default withRouter(EmployeeForm);
