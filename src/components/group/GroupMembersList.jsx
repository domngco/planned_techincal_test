import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RemoveMember from "./editGroupMembership/RemoveMember.jsx";

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
    console.log("members, ", members);
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
              let memberID = this.state.members[index]._id;
              let groupID = this.props.match.params.id;
              return (
                <div key={index}>
                  <div>{member.name}</div>
                  <RemoveMember memberID={memberID} groupID={groupID} />
                </div>
              );
            })}
            <Link to={"/add-group-members/" + this.props.match.params.id}>
              Add Members
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {members.map((member, index) => {
              let groupID = this.props.match.params.id;
              console.log("groupID", groupID);
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
