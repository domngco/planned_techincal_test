let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let authData = require("./authData");

let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;

let dbo = undefined;
MongoClient.connect(
  authData.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    dbo = db.db(authData.dataBase);
  }
);

let Employee = app.post("/employee", upload.none(), (req, res) => {
  let _employeeID = req.body.employeeID;
  dbo
    .collection("employees")
    .findOne({ _id: ObjectID(_employeeID) }, (error, employee) => {
      if (error) {
        res.send(
          JSON.stringify({
            success: false,
            message: "Error unable to fetch employee"
          })
        );
        return;
      }
      res.send(
        JSON.stringify({
          success: true,
          message: employee
        })
      );
    });
});

module.exports = Employee;
