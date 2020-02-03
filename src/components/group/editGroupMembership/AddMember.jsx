import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

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
        <Icon onClick={this.handleAdd} color="green" name="add" />
      </React.Fragment>
    );
  }
}

export default withRouter(AddMember);
