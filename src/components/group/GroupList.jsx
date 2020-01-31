import React, { Component } from "react";
import { Link } from "react-router-dom";

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
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.groups.map((group, index) => {
            return (
              <div key={index}>
                <div>{group.name}</div>
                <Link to={"/group/" + group._id}>Learn More</Link>
                <Link to={"/group-membership/" + group._id}>Add Members</Link>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default GroupList;
