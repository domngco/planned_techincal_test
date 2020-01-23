import React from "react";
import { Link } from "react-router-dom";

let MenuNonAdmin = () => {
  return (
    <React.Fragment>
      <Link to="/">
        <img src="https://planned.com/wp-content/uploads/assets/logo-planned.svg" />
      </Link>
      <Link to="/employees">Employees</Link>
      <Link to="/groups">Groups</Link>
      <Link to="/admin">Sign In</Link>
    </React.Fragment>
  );
};

export default MenuNonAdmin;
