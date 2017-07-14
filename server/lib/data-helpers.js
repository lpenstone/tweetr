"use strict";

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
    // likeTweets: function(likeCount, callback) {
    //   db.collection("tweets").find().toArray(callback);
    //   db.inventory.updateOne(
    //      { _id: `ObjectId("${________}")` },
    //      {$set: { "likes": count },
    //        $currentDate: { lastModified: true }
    //      }
    //   )
    // },

    // Get all tweets in MongoDB
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    }

  };
}


