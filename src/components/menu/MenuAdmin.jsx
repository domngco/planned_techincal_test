import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

class MenuAdmin extends Component {
  constructor() {
    super();
    this.state = {
      hidden: true,
      activeItem: ""
    };
  }

  toggleHidden = () => {
    this.setState({ ...this.state, hidden: !this.state.hidden });
  };

  toggleClick = (error, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <React.Fragment>
        {this.state.hidden ? (
          <Menu pointing secondary vertical>
            <Menu.Item
              name="Employees"
              as={Link}
              to="/employee-list"
              active={activeItem === "Employees"}
              onClick={this.toggleClick}
            />
            <Menu.Item
              name="Groups"
              as={Link}
              to="/group-list"
              active={activeItem === "Groups"}
              onClick={this.toggleClick}
            />
            <Menu.Item onClick={this.toggleHidden}>
              <Icon name="plus" />
            </Menu.Item>
          </Menu>
        ) : (
          <Menu pointing secondary vertical>
            <Menu.Item
              name="Employees"
              as={Link}
              to="/employee-list"
              active={activeItem === "Employees"}
              onClick={this.toggleClick}
            />
            <Menu.Item
              name="Groups"
              as={Link}
              to="/group-list"
              active={activeItem === "Groups"}
              onClick={this.toggleClick}
            />
            <Menu.Item
              name="Add an Employee"
              as={Link}
              to="/add-employee"
              active={activeItem === "Add an Employee"}
              onClick={this.toggleClick}
            />
            <Menu.Item
              name="Add an Group"
              as={Link}
              to="/add-group"
              active={activeItem === "Add an Group"}
              onClick={this.toggleClick}
            />
            <Menu.Item onClick={this.toggleHidden}>
              <Icon name="minus" />
            </Menu.Item>
          </Menu>
        )}
      </React.Fragment>
    );
  }
}

export default MenuAdmin;
