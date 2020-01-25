import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuAdmin extends Component {
  constructor() {
    super();
    this.state = {
      hidden: true
    };
  }

  toggleCreate = () => {
    this.setState({ ...this.state, hidden: !this.state.hidden });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.hidden ? (
          <div>
            <Link to="/">
              <img src="https://planned.com/wp-content/uploads/assets/logo-planned.svg" />
            </Link>
            <Link to="/employee-list">Employees</Link>
            <Link to="/group-list">Groups</Link>
            <div onClick={this.toggleCreate}>+</div>
          </div>
        ) : (
          <div>
            <Link to="/">
              <img src="https://planned.com/wp-content/uploads/assets/logo-planned.svg" />
            </Link>
            <Link to="/employee-list">Employees</Link>
            <Link to="/group-list">Groups</Link>
            <Link to="/add-employee">Add an Employee</Link>
            <Link to="/add-group">Add a Group</Link>
            <div onClick={this.toggleCreate}>x</div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default MenuAdmin;
