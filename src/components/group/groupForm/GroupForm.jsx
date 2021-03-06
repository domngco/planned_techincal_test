import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import GroupDetails from "./GroupDetails.jsx";
import Confirm from "./Confirm.jsx";

class UnconnectedGroupForm extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      name: "",
      department: "",
      description: ""
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
    let data = new FormData();
    data.append("name", this.state.name);
    data.append("department", this.state.department);
    data.append("description", this.state.description);
    data.append("members", this.state.members);
    let response = await fetch("/add-group", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("body", body);
    if (!body.success) {
      alert(body.message);
      return;
    }
    if (body.success) {
      alert(body.message);
      this.props.history.push("/group-list");
      return;
    }
  };

  render() {
    let { step } = this.state;
    let { name, department, description } = this.state;
    let values = { name, department, description };
    switch (step) {
      case 1:
        return (
          <React.Fragment>
            {this.props.loggedIn ? (
              <GroupDetails
                nextStep={this.nextStep}
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
            nextStep={this.nextStep}
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

let GroupForm = connect(mapStateToProps)(UnconnectedGroupForm);
export default withRouter(GroupForm);
