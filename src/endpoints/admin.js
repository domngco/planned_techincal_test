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

let AdminFetch = app.post("/admin", upload.none(), (req, res) => {
  let _username = req.body.username;
  let _password = req.body.password;
  let _sessionID = "" + Math.floor(Math.random() * 1000000);
  dbo.collection("users").findOne({ username: _username }, (error, user) => {
    if (error) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      res.send(
        JSON.stringify({ success: false, message: "User does not exist" })
      );
      return;
    }
    if (user.password !== _password) {
      res.send(
        JSON.stringify({ success: false, message: "Unsuccessful login" })
      );
      return;
    }
    if (user.password === _password) {
      dbo
        .collection("users")
        .updateOne(
          { username: _username },
          { $set: { sessionID: _sessionID } }
        );
      res.cookie("sid", _sessionID);
      res.send(
        JSON.stringify({
          success: true,
          message: "Welcome back!",
          username: user.username
        })
      );
      return;
    }
  });
});

module.exports = AdminFetch;
