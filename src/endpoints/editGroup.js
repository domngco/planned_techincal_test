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

let EditGroup = app.post("/edit-group", upload.none(), (req, res) => {
  let _groupID = req.body.groupID;
  let _name = req.body.name;
  let _department = req.body.department;
  let _description = req.body.description;
  dbo.collection("groups").updateOne(
    { _id: ObjectID(_groupID) },
    {
      $set: {
        name: _name,
        department: _department,
        description: _description
      }
    }
  );
  return res.send(
    JSON.stringify({
      success: true,
      message: "A group profile has been updated!"
    })
  );
});

module.exports = EditGroup;
