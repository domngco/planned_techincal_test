import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

class MenuNonAdmin extends Component {
  constructor() {
    super();
    this.state = {
      hidden: true,
      activeItem: ""
    };
  }
  toggleClick = (error, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <React.Fragment>
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
            name="Admin"
            as={Link}
            to="/admin"
            active={activeItem === "Admin"}
            onClick={this.toggleClick}
          >
            <Icon name="sign-in" />
            Admin
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }
}

export default MenuNonAdmin;
