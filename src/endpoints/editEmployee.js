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

let EditEmployee = app.post("/edit-employee", upload.none(), (req, res) => {
  let _employeeID = req.body.employeeID;
  let _name = req.body.name;
  let _title = req.body.title;
  let _email = req.body.email;
  let _phone = req.body.phone;
  dbo.collection("employees").updateOne(
    { _id: ObjectID(_employeeID) },
    {
      $set: {
        name: _name,
        title: _title,
        email: _email,
        phone: _phone
      }
    }
  );
  return res.send(
    JSON.stringify({
      success: true,
      message: "An employee profile has been updated!"
    })
  );
});

module.exports = EditEmployee;
