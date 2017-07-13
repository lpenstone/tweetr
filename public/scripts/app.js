/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(tweets) {
  $('section.tweetList').empty();
  for (var users in tweets){
    var $tweet = createTweetElement(tweets[users]);
    $('section.tweetList').prepend($tweet);
  }
}

function createTweetElement(data){
  var name = data['user']['name'];
  var icon = data['user']['avatars']['large'];
  var handle = data['user']['handle'];
  var content = data['content']['text'];
  var timeCreated = data['created_at'];

  var image = $("<img>").addClass("image").attr('src', icon);
  var user = $("<span>").addClass("user").text(handle);
  var userName = $("<h2>").text(name);
  var header = $("<header>").append(image, user, userName);
  var message = $("<p>").addClass("tweetText").text(content);
  var date = $("<span>").addClass("time").text(timeCreated);
  var links = $("<span>").addClass("link").html('<i class="fa fa-heart"></i> <i class="fa fa-retweet"></i> <i class="fa fa-flag"></i>');
  var footer = $("<footer>").append(date, links);
  var $tweet = $("<article>").addClass("tweet").append(header, message, footer);

  return $tweet;
}


function loadTweets() {
  $.ajax({
      url: '/tweets',
      type: 'GET'
  }).then(function (jsonContent) {
      renderTweets(jsonContent);
  });
}




//When the page has loaded
$( document ).ready(function() {

  //Display the tweets initially
  loadTweets();

  //Compose button events and handlers
  $('nav').on('click', '.button', function(){
    let nav = $(this).parent().parent().find('.new-tweet')
    if (nav.is(":visible")){
      $(this).parent().parent().find('#tweetText').blur();
      nav.slideToggle();
    } else {
      nav.slideToggle();
      $(this).parent().parent().find('#tweetText').focus();
    }
    //$(this).parent().parent().find('#tweetText').focus();
    $(this).addClass('on');
  });
  $('nav').on('mouseleave', '.button', function(){
    $(this).removeClass('on');
  });

  //Add new Tweets
  $('#addTweet').on('submit', function (event) {
  event.preventDefault();
  var message = '';
  var data = $('#tweetText').val();
  if ( data === "" || data === null){
    message = '<span class="warning">Need to enter a tweet</span>';
    $("form .warning").replaceWith(message);
  } else if ( data.length > 140){
    message = '<span class="warning">Too many characters</span>';
    $("form .warning").replaceWith(message);
  } else {
    message = "<span class='warning'></span>";
    $("form .warning").replaceWith(message);
    $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      }).done(function () {
        loadTweets();
    });
  $(this).trigger("reset");
  $(this).find('.counter').replaceWith('<span class="counter" maxlength="140">140</span>');
  }
});

});





//<<------------------------------- Ignore ----------------------------->>
//UNSAFE METHOD
    // var result = `<article class="tweet">
    //                   <header>
    //                     <img class="image" src=${icon}>
    //                     <span class="user">${handle}</span>
    //                     <h2>${name}</h2>
    //                   </header>
    //                   <p class="tweetText">${escape(content)}</p>
    //                   <footer>
    //                     <span class="time">${time}</span>
    //                     <span class="link">
    //                       <i class="fa fa-heart"></i>
    //                       <i class="fa fa-retweet"></i>
    //                       <i class="fa fa-flag"></i>
    //                     </span>
    //                   </footer>
    //                 </article>`
    // return result;


    //     var currentTime = Math.round((new Date()).getTime()/1000);
    // var timeSince = (timeCreated - currentTime) / 1000;
    // var time = '';

    // for (i = 0; i < 1000; i++){
    //     if (timeSince < 60){
    //       time = 'just now'
    //     } else if (timeSince > 60 && timeSince < 3600){
    //       time = Math.round(timeSince/60) + ' minutes ago';
    //     } else if (timeSince > 3600 && timeSince < 86400){
    //       time = Math.round(timeSince/3600) + ' hours ago';
    //     } else if (timeSince > 86400 && timeSince < 31536000){
    //       time = Math.round(timeSince/86400) + ' days ago';
    //     } else {
    //       time = Math.round(timeSince/31536000) + ' years ago';
    //     }
    //   }
