import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class UnconnectedGroupMembersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
  }

  componentDidMount = () => {
    this.handleGroup();
  };

  handleGroup = async () => {
    let data = new FormData();
    data.append("groupID", this.props.match.params.id);
    let response = await fetch("/group-member-list", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let members = body.message;
    if (!body.success) {
      alert(body.message);
      return;
    }
    if (body.success) {
      this.setState({ members: members });
      return;
    }
  };

  render() {
    let { members } = this.state;
    return (
      <React.Fragment>
        {this.props.loggedIn ? (
          <React.Fragment>
            {members.map((member, index) => {
              return (
                <div key={index}>
                  <div>{member.name}</div>
                  <div>Remove Member</div>
                </div>
              );
            })}
            <div>Edit Members List</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {members.map((member, index) => {
              return (
                <div key={index}>
                  <div>{member.name}</div>
                </div>
              );
            })}
          </React.Fragment>
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

let GroupMembersList = connect(mapStateToProps)(UnconnectedGroupMembersList);

export default GroupMembersList;
