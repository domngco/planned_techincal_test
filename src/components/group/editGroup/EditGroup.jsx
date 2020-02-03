import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import EditGroupDetails from "./EditGroupDetails.jsx";
import ConfirmEdit from "./ConfirmEdit.jsx";

export class UnconnectedGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      group: {}
    };
  }

  componentDidMount() {
    this.handleGroup();
  }

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
      console.log("this.state.edit group,", this.state);
      return;
    }
  };

  nextStep = () => {
    let step = this.state.step;
    this.setState({
      step: step + 1
    });
  };

  previousStep = () => {
    let step = this.state.step;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => event => {
    event.persist();
    this.setState(prevState => ({
      group: { ...prevState.group, [input]: event.target.value }
    }));
  };

  handleDelete = async () => {
    event.preventDefault();
    let data = new FormData();
    data.append("groupID", this.props.match.params.id);
    let response = await fetch("/delete-group", {
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

  handleSubmit = async () => {
    event.preventDefault();
    let data = new FormData();
    let group = this.state.group;
    data.append("groupID", this.props.match.params.id);
    data.append("name", group.name);
    data.append("department", group.department);
    data.append("description", group.description);
    let response = await fetch("/edit-group", {
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
    let { step } = this.state;
    let { group } = this.state;
    let { name, department, description } = this.state.group;
    let values = { name, department, description };
    switch (step) {
      case 1:
        return (
          <React.Fragment>
            {this.props.loggedIn ? (
              <EditGroupDetails
                nextStep={this.nextStep}
                previousStep={this.previousStep}
                handleChange={this.handleChange}
                handleDelete={this.handleDelete}
                group={group}
                values={values}
              />
            ) : (
              this.props.history.push("/admin")
            )}
          </React.Fragment>
        );
      case 2:
        return (
          <ConfirmEdit
            previousStep={this.previousStep}
            handleSubmit={this.handleSubmit}
            group={this.state.group}
          />
        );
    }
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let Group = connect(mapStateToProps)(UnconnectedGroup);

export default withRouter(Group);
