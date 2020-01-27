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

let DeleteGroup = app.post("/delete-group", upload.none(), (req, res) => {
  let _groupID = req.body.groupID;
  dbo.collection("groups").deleteOne({ _id: ObjectID(_groupID) });
  return res.send(
    JSON.stringify({
      success: true,
      message: "An group profile has been deleted!"
    })
  );
});

module.exports = DeleteGroup;
