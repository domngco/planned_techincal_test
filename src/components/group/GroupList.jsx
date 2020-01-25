import React, { Component } from "react";

export class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  componentDidMount = () => {
    this.handleGroups();
  };

  handleGroups = async () => {
    let response = await fetch("/group-list");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let allGroups = body.message;
    this.setState({ groups: allGroups });
    console.log("allGroups, ", this.state.groups);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.groups.map((group, index) => {
            return (
              <div key={index}>
                <div>{group.name}</div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default GroupList;
