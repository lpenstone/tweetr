"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


//Connect to MongoDB
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) throw err;
  console.log(`Successfully connected to DB: ${MONGODB_URI}`);

  //Send database into DataHelpers
  const DataHelpers = require("./lib/data-helpers.js")(db);
  //Pass DataHelpers to tweetsRoutes
  //define routes to interact with the data layer
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
});

//Display connection in terminal
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
