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

let GroupMembership = app.post(
  "/group-membership",
  upload.none(),
  (req, res) => {
    let _groupID = req.body.groupID;
    let members = JSON.parse(req.body.members);
    if (members === []) {
      return res.send(
        JSON.stringify({
          success: false,
          message: "No members have been assigned"
        })
      );
    }
    console.log("members, ", members);
    dbo
      .collection("group-membership")
      .findOne({ groupID: _groupID }, (error, group) => {
        if (error) {
          res.send(
            JSON.stringify({
              success: false,
              message: "Error unable to fetch group-membership"
            })
          );
          return;
        }
        if (group === null) {
          dbo.collection("group-membership").insertOne(
            {
              groupID: _groupID,
              members: members
            },
            error => {
              res.send(
                JSON.stringify({
                  success: true,
                  message: "Group membership has been created!"
                })
              );
              return;
            }
          );
        } else {
          dbo.collection("group-membership").updateOne(
            { group: _groupID },
            {
              $set: {
                members: members
              }
            }
          );
          return res.send(
            JSON.stringify({
              success: true,
              message: "Group membership has been updated!"
            })
          );
        }
      });
  }
);

module.exports = GroupMembership;
