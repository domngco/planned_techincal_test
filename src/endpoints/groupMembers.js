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

let GroupMembers = app.post("/group-membership", upload.none(), (req, res) => {
  let _groupID = req.body.groupID;
  let members = req.body.members;
  if (members === []) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "No members have been assigned"
      })
    );
  }
  let _members = members;
  console.log("__________members, ", _members);
  let _groupMembers = [];

  dbo
    .collection("group-membership")
    .findOne({ groupID: _groupID }, (error, group) => {
      if (error) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      if (group === null) {
        _groupMembers.push(_members);
        try {
          dbo.collection.insertOne(
            {
              groupID: _groupID,
              members: _groupMembers
            },
            error => {
              res.send(
                JSON.stringify({
                  success: true,
                  message: "Group members have been added!"
                })
              );
              return;
            }
          );
        } catch (error) {
          return res.send(
            JSON.stringify({
              success: false,
              message: error.toString()
            })
          );
        }
      } else {
        _groupMembers = [...group.group];
        _groupMembers.push(_members);
        try {
          dbo.collection("group-membership").updateOne(
            { groupID: _groupID },
            {
              $set: {
                members: _groupMembers
              }
            },
            dbo
              .collection("group-membership")
              .findOne({ groupID: _groupID }, (error, member) => {
                return res.send(
                  JSON.stringify({
                    success: true,
                    message: member
                  })
                );
              })
          );
        } catch {
          return res.send(
            JSON.stringify({
              success: false,
              message: error.toString()
            })
          );
        }
      }
    });
});

module.exports = GroupMembers;
