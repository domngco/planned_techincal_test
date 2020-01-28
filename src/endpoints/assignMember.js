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

let AssignMember = app.post("/assign-member", upload.none(), (req, res) => {
  let _groupID = req.body.groupID;
  let _member = req.body.members;
  dbo.collection("groups").updateOne(
    { _id: ObjectID(_groupID) },
    {
      $set: { members: _member }
    }
  );
  return res.send(
    JSON.stringify({
      success: true,
      message: "Updated Group Membership!"
    })
  );
});

module.exports = AssignMember;
