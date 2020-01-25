let express = require("express");
let app = express();
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

let GroupList = app.get("/group-list", (req, res) => {
  dbo
    .collection("groups")
    .find({})
    .toArray((error, allGroups) => {
      if (error) {
        res.send(
          JSON.stringify({
            success: false,
            message: "Error unable to fetch Group list"
          })
        );
        return;
      }
      res.send(
        JSON.stringify({
          success: true,
          message: allGroups
        })
      );
    });
});

module.exports = GroupList;
