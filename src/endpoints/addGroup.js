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

let AddGroup = app.post("/add-group", upload.none(), (req, res) => {
  let _name = req.body.name;
  let _department = req.body.department;
  let _description = req.body.description;
  dbo.collection("groups").findOne({ name: _name }, (error, group) => {
    if (error) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (group !== null) {
      res.send(
        JSON.stringify({
          success: false,
          message: "Group is already in the database"
        })
      );
      return;
    }
    dbo.collection("groups").insertOne(
      {
        name: _name,
        department: _department,
        description: _description,
        dateJoined: Date(Date.now()).toString()
      },
      error => {
        res.send(
          JSON.stringify({
            success: true,
            message: "A new group has been added!"
          })
        );
        return;
      }
    );
  });
});

module.exports = AddGroup;
