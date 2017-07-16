"use strict";
//Require necessary modules
const userHelper    = require("../lib/util/user-helper")
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  //Get endpoint to retrieve Tweet data
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });


  //POST endpoint to save tweet and generate user data
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    //User data randomly generated
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: 0
    };
    //Saves tweet to database
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  //GET endpoint to retrieve likes data
  tweetsRoutes.get("/likes/:id", function(req, res) {
    let id = req.params.id;
    DataHelpers.getLikes(id, (err, tweet) => {
    res.json(tweet.likes);
    });
  });

  //POST endpoint to save likes data
  tweetsRoutes.post("/likes/", function(req, res) {
    let likes = parseInt(req.body.likes);
    let id = req.body.id;
    DataHelpers.saveLike(likes, id, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });
  return tweetsRoutes;
}

//Apply DataHelpers to the route /tweets
function addTweet(data) {
  $.get('/tweets').then(function () {
    DataHelpers(data);
  });
};
