import React, { Component } from "react";
import { connect } from "react-redux";
import MenuAdmin from "./MenuAdmin.jsx";
import MenuNonAdmin from "./MenuNonAdmin.jsx";

class UnconnectedMenu extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.loggedIn ? <MenuAdmin /> : <MenuNonAdmin />}
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let Menu = connect(mapStateToProps)(UnconnectedMenu);

export default Menu;
