import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AboutUs from "./AboutUs.jsx";

// Admin //
import Admin from "../admin/Admin.jsx";

// Employee(s) //
import CreateEmployee from "../employee/createEmployee/CreateEmployee.jsx";
import EditEmployee from "../employee/EditEmployee.jsx";
import Employee from "../employee/Employee.jsx";
import EmployeeList from "../employee/EmployeeList.jsx";

// Group(s) //
import CreateGroup from "../group/createGroup/CreateGroup.jsx";
import EditGroup from "../group/EditGroup.jsx";
import Group from "../group/Group.jsx";
import GroupList from "../group/GroupList.jsx";

export class Content extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact={true} path="/" component={AboutUs} />
          <Route exact={true} path="/admin" component={Admin} />
          <Route exact={true} path="/employee" component={Employee} />
          <Route exact={true} path="/employee-list" component={EmployeeList} />
          <Route
            exact={true}
            path="/create-employee"
            component={CreateEmployee}
          />
          <Route exact={true} path="/edit-employee" component={EditEmployee} />
          <Route exact={true} path="/group" component={Group} />
          <Route exact={true} path="/group-list" component={GroupList} />
          <Route exact={true} path="/create-group" component={CreateGroup} />
          <Route exact={true} path="/edit-group" component={EditGroup} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Content;
