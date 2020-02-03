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

let RemoveMember = app.post("/remove-member", upload.none(), (req, res) => {
  let _groupID = req.body.groupID;
  console.log("groupID", _groupID);
  let _memberID = req.body.memberID;
  console.log("memberID", _memberID);
  dbo.collection("group-membership").updateOne(
    { groupID: _groupID },
    {
      $pull: {
        members: {
          _id: _memberID
        }
      }
    },
    error => {
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
          message: "Selected Member has been successfully removed"
        })
      );
    }
  );
});

module.exports = RemoveMember;
