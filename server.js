let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
let reloadMagic = require("./reload-magic.js");
let AdminFetch = require("./src/endpoints/admin.js");

let AddEmployee = require("./src/endpoints/addEmployee.js");
let EmployeeList = require("./src/endpoints/employeeList.js");
let EditEmployee = require("./src/endpoints/editEmployee.js");
let Employee = require("./src/endpoints/employee.js");
let DeleteEmployee = require("./src/endpoints/deleteEmployee.js");

let AddGroup = require("./src/endpoints/addGroup.js");
let GroupList = require("./src/endpoints/groupList.js");
let Group = require("./src/endpoints/group.js");
let EditGroup = require("./src/endpoints/editGroup.js");
let DeleteGroup = require("./src/endpoints/deleteGroup.js");

let AssignMember = require("./src/endpoints/assignMember.js");

reloadMagic(app);

app.use(cookieParser());
app.use("/", express.static("build"));
app.use("/", express.static("public"));
app.use(AdminFetch);

app.use(AddEmployee);
app.use(EmployeeList);
app.use(Employee);
app.use(EditEmployee);
app.use(DeleteEmployee);

app.use(AddGroup);
app.use(GroupList);
app.use(Group);
app.use(EditGroup);
app.use(DeleteGroup);

app.use(AssignMember);

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
