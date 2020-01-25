import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AboutUs from "./AboutUs.jsx";

// Admin //
import Admin from "../admin/Admin.jsx";

// Employee(s) //
import EmployeeForm from "../employee/employeeForm/EmployeeForm.jsx";
import EmployeeList from "../employee/EmployeeList.jsx";

// Group(s) //

class Content extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact={true} path="/" component={AboutUs} />
          <Route exact={true} path="/admin" component={Admin} />
          <Route exact={true} path="/add-employee" component={EmployeeForm} />
          <Route exact={true} path="/employee-list" component={EmployeeList} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Content;
