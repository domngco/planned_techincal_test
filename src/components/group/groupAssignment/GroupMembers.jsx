import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import EditGroupMembers from "./EditGroupMembers.jsx";
import ConfirmGroupMembers from "./ConfirmGroupMembers.jsx";

export class UnconnectedGroupMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
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
    let members = employees.map(employee =>
      Object.assign({}, employee, {
        member: false
      })
    );
    this.setState({ members: members });
  };

  handleToggleMember = index => {
    event.preventDefault();
    let members = this.state.members;
    members[index].member = !members[index].member;
    this.setState({ member: members });
  };

  handleMembership = () => {
    let members = this.state.members;
    let filterMembers = members.filter(member => {
      return member.member === true;
    });
    let mapMembers = filterMembers.map(member => {
      return member;
    });
    this.setState({ members: mapMembers });
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
    let { members } = this.state;
    switch (step) {
      case 1:
        return (
          <React.Fragment>
            {this.props.loggedIn ? (
              <EditGroupMembers
                members={members}
                handleToggleMember={this.handleToggleMember}
                nextStep={this.nextStep}
                handleMembership={this.handleMembership}
              />
            ) : (
              this.props.history.push("/admin")
            )}
          </React.Fragment>
        );
      case 2:
        return (
          <ConfirmGroupMembers
            members={members}
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

let GroupMembers = connect(mapStateToProps)(UnconnectedGroupMembers);

export default withRouter(GroupMembers);
