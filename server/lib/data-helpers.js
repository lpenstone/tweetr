"use strict";

let ObjectId = require("mongodb").ObjectId;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to MongoDB
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in MongoDB
    getTweets: function(callback) {
      return db.collection("tweets").find().toArray(callback);
    },

    saveLike: function(like, id, callback) {
      simulateDelay(() => {
        console.log(id)
        db.collection("tweets").updateOne(
                                       { _id: ObjectId(id) },
                                       {
                                         $set: { "created_at": like },
                                         $currentDate: { lastModified: true }
                                       }
                                    );
        callback(null, true);
      });
    },

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


