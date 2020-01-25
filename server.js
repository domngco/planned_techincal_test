let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
let reloadMagic = require("./reload-magic.js");
let AdminFetch = require("./src/endpoints/admin.js");
let AddEmployee = require("./src/endpoints/addEmployee.js");
let EmployeeList = require("./src/endpoints/employeeList.js");
let Employee = require("./src/endpoints/employee.js");
let AddGroup = require("./src/endpoints/addGroup.js");
let GroupList = require("./src/endpoints/groupList.js");

reloadMagic(app);

app.use(cookieParser());
app.use("/", express.static("build"));
app.use("/", express.static("public"));
app.use(AdminFetch);

app.use(AddEmployee);
app.use(EmployeeList);
app.use(Employee);

app.use(AddGroup);
app.use(GroupList);

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
