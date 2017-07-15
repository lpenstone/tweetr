"use strict";

let ObjectId = require("mongodb").ObjectId;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to database
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets from database
    getTweets: function(callback) {
      return db.collection("tweets").find().toArray(callback);
    },

    //Save the number of likes to databse
    saveLike: function(like, id, callback) {
      console.log(id)
      db.collection("tweets").update(
                                     { _id: ObjectId(id) },
                                     {
                                       $set: { "created_at": like },
                                       $currentDate: { lastModified: true }
                                     },
                                     { upsert: true}
                                    );
      callback(null, true);
    },

    //Retrieve the number of likes from database
    getLikes: function(id, callback) {
      let _id = new ObjectId(id);
      db.collection("tweets").findOne(
        {"_id": _id},
        {"created_at": 1},
        callback
      );
    }
  };
}


