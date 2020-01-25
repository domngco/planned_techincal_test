let express = require("express");
let app = express();
let authData = require("./authData");

let MongoClient = require("mongodb").MongoClient;
let dbo = undefined;
MongoClient.connect(authData.url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db(authData.dataBase);
});

let EmployeeList = app.get("/employee-list", (req, res) => {
  dbo
    .collection("employees")
    .find({})
    .toArray((error, allEmployees) => {
      if (error) {
        res.send(
          JSON.stringify({
            success: false,
            message: "Error unable to fetch employee list"
          })
        );
        return;
      }
      res.send(
        JSON.stringify({
          success: true,
          message: allEmployees
        })
      );
    });
});

module.exports = EmployeeList;
