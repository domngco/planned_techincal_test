import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import EditGroupAssignment from "./EditGroupAssignment.jsx";

export class UnconnectedGroupAssignment extends Component {
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
    let _employees = allEmployees.map(employee =>
      Object.assign({}, employee, {
        member: false
      })
    );
    this.setState({ employees: _employees });
  };

  handleAssignment = index => {
    event.preventDefault();
    let assignEmployees = this.state.employees;
    assignEmployees[index].member = !assignEmployees[index].member;
    this.setState({ employees: assignEmployees });
  };

  handleSubmit = async () => {
    event.preventDefault();
    let _employees = this.state.employees;
    let _filterMembers = _employees.filter(employee => {
      return employee.member === true;
    });
    let _mapMembers = _filterMembers.map(member => {
      return member._id;
    });
    let _member = _mapMembers;
    let data = new FormData();
    data.append("groupID", this.props.match.params.id);
    data.append("members", _member);
    let response = await fetch("/assign-member", {
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
    let { employees } = this.state;
    return (
      <React.Fragment>
        {this.props.loggedIn ? (
          <EditGroupAssignment
            handleAssignment={this.handleAssignment}
            handleSubmit={this.handleSubmit}
            employees={employees}
          />
        ) : (
          this.props.history.push("/admin")
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

let GroupAssignment = connect(mapStateToProps)(UnconnectedGroupAssignment);

export default withRouter(GroupAssignment);
