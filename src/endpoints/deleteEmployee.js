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

let DeleteEmployee = app.post("/delete-employee", upload.none(), (req, res) => {
  let _employeeID = req.body.employeeID;
  dbo.collection("employees").deleteOne({ _id: ObjectID(_employeeID) });
  return res.send(
    JSON.stringify({
      success: true,
      message: "An employee profile has been deleted!"
    })
  );
});

module.exports = DeleteEmployee;
