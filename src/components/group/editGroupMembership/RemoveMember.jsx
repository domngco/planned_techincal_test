import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export class RemoveMember extends Component {
  handleDelete = async () => {
    event.preventDefault();
    let memberID = this.props.memberID;
    let groupID = this.props.groupID;
    let data = new FormData();
    data.append("memberID", memberID);
    data.append("groupID", groupID);
    let response = await fetch("/remove-member", {
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
    return (
      <React.Fragment>
        <button onClick={this.handleDelete}>Remove</button>
      </React.Fragment>
    );
  }
}

export default withRouter(RemoveMember);
