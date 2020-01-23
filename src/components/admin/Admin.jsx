import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async () => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/admin", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.succes) {
      alert(body.message);
      return;
    }
    if (body.success) {
      this.props.dispatch({
        type: "admin"
      });
    }
    this.props.history.push("/");
    return;
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              onChange={this.handleUsername}
            />
            <input
              type="text"
              placeholder="Password"
              onChange={this.handlePassword}
            />
            <input type="submit" value="Sign In" />
            <input type="reset" value="Clear" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

let Admin = connect()(UnconnectedAdmin);

export default Admin;
