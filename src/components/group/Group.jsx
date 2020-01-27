import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class UnconnectedGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {}
    };
  }

  componentDidMount = () => {
    this.handleGroup();
  };

  handleGroup = async () => {
    let data = new FormData();
    data.append("groupID", this.props.match.params.id);
    let response = await fetch("/group", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let _group = body.message;
    if (!body.success) {
      alert("Unsuccessful, ", body.message);
      return;
    }
    if (body.success) {
      this.setState({ group: _group });
      return;
    }
    console.log("group, ", this.state.group);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.loggedIn ? (
          <div>
            <div>{this.state.group.name}</div>
            <Link to={"/edit-group/" + this.props.match.params.id}>
              Edit Group
            </Link>
            <Link to={"/group-assignment/" + this.props.match.params.id}>
              Group Assignment
            </Link>
          </div>
        ) : (
          <div>{this.state.group.name}</div>
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

let Group = connect(mapStateToProps)(UnconnectedGroup);

export default Group;
