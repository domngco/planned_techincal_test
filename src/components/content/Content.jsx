import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AboutUs from "./AboutUs.jsx";

// Admin //
import Admin from "../admin/Admin.jsx";

// Employee(s) //
import EmployeeForm from "../employee/employeeForm/EmployeeForm.jsx";
import EmployeeList from "../employee/EmployeeList.jsx";
import Employee from "../employee/Employee.jsx";
import EditEmployee from "../employee/editEmployee/EditEmployee.jsx";

// Group(s) //

import GroupForm from "../group/groupForm/GroupForm.jsx";
import GroupList from "../group/GroupList.jsx";
import Group from "../group/Group.jsx";
import EditGroup from "../group/editGroup/EditGroup.jsx";

// Group Membership //

import AddGroupMembers from "../group/editGroupMembership/AddGroupMembers.jsx";

class Content extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact={true} path="/" component={AboutUs} />
          <Route exact={true} path="/admin" component={Admin} />
          <Route exact={true} path="/add-employee" component={EmployeeForm} />
          <Route exact={true} path="/employee-list" component={EmployeeList} />
          <Route exact={true} path="/employee/:id" component={Employee} />
          <Route
            exact={true}
            path="/edit-employee/:id"
            component={EditEmployee}
          />
          <Route exact={true} path="/add-group" component={GroupForm} />
          <Route exact={true} path="/group-list" component={GroupList} />

          <Route exact={true} path="/group/:id" component={Group} />
          <Route exact={true} path="/edit-group/:id" component={EditGroup} />
          <Route
            exact={true}
            path="/add-group-members/:id"
            component={AddGroupMembers}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Content;
