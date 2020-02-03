let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let authData = require("./authData");

let MongoClient = require("mongodb").MongoClient;
let dbo = undefined;
MongoClient.connect(
  authData.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    dbo = db.db(authData.dataBase);
  }
);

let AddEmployee = app.post("/add-employee", upload.none(), (req, res) => {
  let _firstName = req.body.firstName;
  let _lastName = req.body.lastName;
  let _title = req.body.title;
  let _email = req.body.email;
  let _phone = req.body.phone;
  dbo.collection("employees").findOne({ name: _name }, (error, employee) => {
    if (error) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (employee !== null) {
      res.send(
        JSON.stringify({
          success: false,
          message: "Employee is already in the database"
        })
      );
      return;
    }
    dbo.collection("employees").insertOne(
      {
        firstName: _firstName,
        lastName: _lastName,
        title: _title,
        email: _email,
        phone: _phone,
        dateJoined: Date(Date.now()).toString()
      },
      error => {
        res.send(
          JSON.stringify({
            success: true,
            message: "A new employee has been added!"
          })
        );
        return;
      }
    );
  });
});

module.exports = AddEmployee;
