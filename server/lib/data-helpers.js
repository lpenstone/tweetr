"use strict";

let ObjectId = require("mongodb").ObjectId;

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
                                       $set: { "likes": like },
                                       $currentDate: { lastModified: true }
                                     },
                                     { upsert: true }
                                    );
      callback(null, true);
    },

    //Retrieve the number of likes from database
    getLikes: function(id, callback) {
      let _id = new ObjectId(id);
      db.collection("tweets").findOne(
        {"_id": _id},
        {"likes": 1},
        callback
      );
    }
  };
}

