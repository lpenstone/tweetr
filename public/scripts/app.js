/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {
  var data =
  [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function renderTweets(tweets) {
    for (var users in tweets){
      var $tweet = createTweetElement(tweets[users]);
      $('main').append($tweet);
    }
  }

  function createTweetElement(data){
    var name = data['user']['name'];
    var icon = data['user']['avatars']['large'];
    var handle = data['user']['handle'];
    var content = data['content']['text'];
    var time = data['created_at'];

    var $image = $("<img>").addClass("image").attr('src', icon);
    var $user = $("<span>").addClass("user").text(handle);
    var $userName = $("<h2>").text(name);
    var $header = $("<header>").append($image, $user, $userName);
    var $message = $("<p>").addClass("tweetText").text(content);
    var $date = $("<span>").addClass("time").text(time);
    var $links = $("<span>").addClass("link").html('<i class="fa fa-heart"></i> <i class="fa fa-retweet"></i> <i class="fa fa-flag"></i>');
    var $footer = $("<footer>").append($date, $links);
    var $tweet = $("<article>").addClass("tweet").append($header, $message, $footer);


//UNSAFE METHOD
    // var result = `<article class="tweet">
    //                   <header>
    //                     <img class="image" src=${icon}>
    //                     <span class="user">${handle}</span>
    //                     <h2>${name}</h2>
    //                   </header>
    //                   <p class="tweetText">${content}</p>
    //                   <footer>
    //                     <span class="time">${time}</span>
    //                     <span class="link">
    //                       <i class="fa fa-heart"></i>
    //                       <i class="fa fa-retweet"></i>
    //                       <i class="fa fa-flag"></i>
    //                     </span>
    //                   </footer>
    //                 </article>`
    return $tweet;
  }

  renderTweets(data);
});
