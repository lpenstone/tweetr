/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {
var tweetData =
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
  }


function renderTweets(tweets) {
  var $tweet = createTweetElement(tweets);
  $('main').append($tweet);
}


function createTweetElement(data){
  var name = data['user']['name'];
  var icon = data['user']['avatars']['large'];
  var handle = data['user']['handle'];
  var content = data['content']['text'];
  var time = data['created_at'];

  var result = `<article class="tweet">
                    <header>
                      <img class="image" src=${icon}>
                      <span class="user">${handle}</span>
                      <h2>${name}</h2>
                    </header>
                    <p class="tweetText">${content}</p>
                    <footer>
                      <span class="time">${time}</span>
                      <span class="link"><i class="fa fa-heart"></i> <i class="fa fa-retweet"></i> <i class="fa fa-flag"></i></span>
                    </footer>
                  </article>`
  return result;
}

renderTweets(tweetData);


});
