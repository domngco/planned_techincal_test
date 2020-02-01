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

let GroupMembersList = app.post(
  "/group-member-list",
  upload.none(),
  (req, res) => {
    let _groupID = req.body.groupID;
    dbo
      .collection("group-membership")
      .findOne({ groupID: _groupID }, (error, group) => {
        if (error) {
          res.send(
            JSON.stringify({
              success: false,
              message: "Error unable to fetch group"
            })
          );
          return;
        }
        if (group === null) {
          res.send(
            JSON.stringify({
              success: false,
              message: "Group has no members"
            })
          );
          return;
        }
        res.send(
          JSON.stringify({
            success: true,
            message: group.members
          })
        );
      });
  }
);

module.exports = GroupMembersList;
