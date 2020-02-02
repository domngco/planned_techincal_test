import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export class AddMember extends Component {
  handleAdd = async () => {
    event.preventDefault();
    let member = this.props.member;
    let groupID = this.props.groupID;
    let data = new FormData();
    data.append("member", JSON.stringify(member));
    data.append("groupID", groupID);
    let response = await fetch("/add-member", {
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
      return;
    }
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleAdd}>Add</button>
      </React.Fragment>
    );
  }
}

export default withRouter(AddMember);
