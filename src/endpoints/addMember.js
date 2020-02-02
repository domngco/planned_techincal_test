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

let AddMember = app.post("/add-member", upload.none(), (req, res) => {
  let groupID = req.body.groupID;
  let member = JSON.parse(req.body.member);
  let memberID = member._id;
  console.log("add-member, groupID -", groupID);
  console.log("add-member, member -", member);
  console.log("add-member, memberID -", memberID);
  dbo
    .collection("group-membership")
    .findOne({ groupID: groupID }, (error, group) => {
      if (error) {
        res.send(
          JSON.stringify({ success: false, message: "Error - ", error })
        );
        return;
      }
      if (group === null) {
        dbo.collection("group-membership").insertOne(
          {
            groupID: groupID,
            members: [member]
          },
          () => {
            res.send(
              JSON.stringify({
                success: true,
                message: member.name + "has been added to the group!"
              })
            );
            return;
          }
        );
      }
      if (group !== null) {
        dbo.collection("group-membership").updateOne(
          { groupID: groupID },
          {
            $addToSet: {
              members: member
            }
          }
        );
        return res.send(
          JSON.stringify({
            success: true,
            message: member.name + "has been added to the group!"
          })
        );
      }
    });
});

module.exports = AddMember;
