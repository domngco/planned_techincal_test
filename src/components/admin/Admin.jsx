import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Header } from "semantic-ui-react";

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
    console.log(this.state);
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
    if (!body.success) {
      alert(body.message);
      return;
    }
    if (body.success) {
      this.props.dispatch({
        type: "login-successful"
      });
    }
    this.props.history.push("/");
    return;
  };

  render() {
    return (
      <React.Fragment>
        <Header as="h2">Sign In</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              type="text"
              placeholder="Username"
              onChange={this.handleUsername}
            />
            <Form.Input
              type="password"
              placeholder="Password"
              onChange={this.handlePassword}
            />
          </Form.Group>
          <Form.Button fluid type="submit">
            Sign In
          </Form.Button>
        </Form>
      </React.Fragment>
    );
  }
}

let Admin = connect()(UnconnectedAdmin);

export default withRouter(Admin);
