import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AssignGroupMembership from "./AssignGroupMembership.jsx";
import ViewGroupMembership from "./ViewGroupMembership.jsx";
import ConfirmGroupMembership from "./ConfirmGroupMembership.jsx";

export class UnconnectedGroupMembersFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      employees: [],
      members: []
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

  componentDidMount = () => {
    this.handleEmployees();
  };

  handleEmployees = async () => {
    let response = await fetch("/employee-list");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let employees = body.message;
    let _employees = employees.map(employee =>
      Object.assign({}, employee, {
        member: false
      })
    );
    this.setState({ employees: _employees });
  };

  toggleMember = index => {
    event.preventDefault();
    let employees = this.state.employees;
    employees[index].member = !employees[index].member;
    this.setState({ employees: employees });
    console.log("this.state.employees", this.state.employees);
  };

  handleMembers = () => {
    event.preventDefault();
    let employees = this.state.employees;
    let filterEmployees = employees.filter(employee => {
      return employee.member === true;
    });
    let mapEmployees = filterEmployees.map(employee => {
      return employee;
    });
    this.setState({ members: mapEmployees });
    console.log("this.state.members", this.state.members);
  };

  handleSubmit = async () => {
    event.preventDefault();
    let members = this.state.members;
    let data = new FormData();
    data.append("groupID", this.props.match.params.id);
    data.append("members", JSON.stringify(members));
    let response = await fetch("/group-membership", {
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
    let { employees, members } = this.state;
    switch (step) {
      case 1:
        return (
          <React.Fragment>
            {this.props.loggedIn ? (
              <AssignGroupMembership
                employees={employees}
                toggleMember={this.toggleMember}
                handleMembers={this.handleMembers}
                nextStep={this.nextStep}
              />
            ) : (
              this.props.history.push("/admin")
            )}
          </React.Fragment>
        );
      case 2:
        return (
          <ViewGroupMembership
            members={members}
            nextStep={this.nextStep}
            previousStep={this.previousStep}
          />
        );
      case 3:
        return (
          <ConfirmGroupMembership
            previousStep={this.previousStep}
            handleSubmit={this.handleSubmit}
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

let GroupMembersFrom = connect(mapStateToProps)(UnconnectedGroupMembersFrom);

export default withRouter(GroupMembersFrom);
