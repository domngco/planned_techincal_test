import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddMember from "./AddMember.jsx";

export class UnconnectedEditMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
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
    let employees = body.message;
    this.setState({ employees: employees });
    console.log("AddGroupMembers - employees, ", employees);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.employees.map((employee, index) => {
            let member = this.state.employees[index];
            let groupID = this.props.match.params.id;
            return (
              <div key={index}>
                <div>{employee.name}</div>
                <AddMember member={member} groupID={groupID} />
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let EditMembers = connect(mapStateToProps)(UnconnectedEditMembers);

export default withRouter(EditMembers);
