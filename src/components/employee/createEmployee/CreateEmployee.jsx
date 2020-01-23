import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EmployeeDetails from "./EmployeeDetails.jsx";
import AssignGroup from "./AssignGroup.jsx";
import Confirm from "./Confirm.jsx";

class UnconnectedCreateEmployee extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      name: "",
      title: "",
      group: []
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
    console.log("state", this.state);
  };

  render() {
    let { step } = this.state;
    let { name, title, group } = this.state;
    let values = { name, title, group };
    switch (step) {
      case 1:
        return (
          <EmployeeDetails
            nextStep={this.nextStep}
            previousStep={this.previousStep}
            values={values}
          />
        );
      case 2:
        return (
          <AssignGroup
            nextStep={this.nextStep}
            previousStep={this.previousStep}
            values={values}
          />
        );
      case 3:
        return <Confirm previousStep={this.previousStep} values={values} />;
    }
  }
}

const mapStateToProps = () => ({});

let CreateEmployee = connect(mapStateToProps)(UnconnectedCreateEmployee);
export default withRouter(CreateEmployee);
