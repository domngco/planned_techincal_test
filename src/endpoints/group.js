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

let Group = app.post("/group", upload.none(), (req, res) => {
  let _groupID = req.body.groupID;
  dbo
    .collection("groups")
    .findOne({ _id: ObjectID(_groupID) }, (error, group) => {
      if (error) {
        res.send(
          JSON.stringify({
            success: false,
            message: "Error unable to fetch group"
          })
        );
        return;
      }
      res.send(
        JSON.stringify({
          success: true,
          message: group
        })
      );
    });
});

module.exports = Group;
