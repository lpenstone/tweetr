//Create Tweet HTML for homepage with data from database
function createTweetElement(data){
  let name = data['user']['name'];
  let icon = data['user']['avatars']['large'];
  let handle = data['user']['handle'];
  let content = data['content']['text'];
  let timeCreated = data['created_at'];
  let time = getTime(timeCreated);
  let id = data['_id'];
  let likes = data['likes'];

  let image = $("<img>").addClass("image").attr('src', icon);
  let user = $("<span>").addClass("user").text(handle);
  let userName = $("<h2>").text(name);
  let header = $("<header>").append(image, user, userName);
  let message = $("<p>").addClass("tweetText").text(content);
  let date = $("<span>").addClass("time").text(time);
  let links = $("<span>").addClass("link").html(`<span class="likesCount">${likes}</span> <span class="like"><i class="fa fa-heart"></i></span> <i class="fa fa-retweet"></i> <i class="fa fa-flag"></i>`);
  let footer = $("<footer>").append(date, links);
  let $tweetHTML = $("<article>").addClass("tweet").attr('id', id ).append(header, message, footer);

  return $tweetHTML;
}

//Display time Tweets were sent in user-friendly manner
function getTime(timeCreated){
  let currentTime =  Date.now();
  let timeSince = (currentTime - timeCreated)/1000;
  let time = '';

  if (timeSince < 60){
    time = 'just now'
  } else if (timeSince > 60 && timeSince < 3600){
    time = Math.round(timeSince/60) + ' minutes ago';
  } else if (timeSince > 3600 && timeSince < 86400){
    time = Math.round(timeSince/3600) + ' hours ago';
  } else if (timeSince > 86400 && timeSince < 31536000){
    time = Math.round(timeSince/86400) + ' days ago';
  } else {
    time = Math.round(timeSince/31536000) + ' years ago';
  }
  return time;
}

//Display tweets on the homepage
function renderTweets(tweets) {
  $('section.tweetList').empty();
  for (var users in tweets){
    var $tweet = createTweetElement(tweets[users]);
    $('section.tweetList').prepend($tweet);
  }
}

//Retrieve Tweet data from databse to add to homepage
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

  //"Compose" button to toggle tweet submission form
  $('nav').on('click', '.button', function(){
    let nav = $(this).parent().parent().find('.new-tweet')
    if (nav.is(":visible")){
      $(this).parent().parent().find('#tweetText').blur();
      nav.slideToggle();
    } else {
      nav.slideToggle();
      $(this).parent().parent().find('#tweetText').focus();
    }
    $(this).addClass('on');
  });
  $('nav').on('mouseleave', '.button', function(){
    $(this).removeClass('on');
  });

  //"Like" button
  $('main').on('click', '.like', function(){
    const _this = this;
    let id = $(this).parent().parent().parent().attr('id');
    //Toggle heart colour
    if ($(this).hasClass("active")){
      $(this).removeClass('active');
      var check = false; //Check if button has already been pressed
    } else {
      $(this).addClass('active');
      var check = true; //Check if button has already been pressed
    }
    //Retrieving number of likes from database
    $.ajax({
      url: `/tweets/likes/${id}/`,
      type: "GET",
    }).done(function(data) { //Apply functions using the number of likes
      let newLikes = count(data, check); //Add or remove like
      displayLikes(newLikes); //display the number of likes
      updateLikes(newLikes, id); //update number of likes in databse
    });
    //Display the number of likes
    function displayLikes(likes){
      let likesSpan = `<span class="likesCount">${likes}</span>`
      $(_this).parent().find('.likesCount').replaceWith(likesSpan);
      console.log(likes);
    }
    //Add or remove likes to the total
    function count(likes, check){
      if (!likes){
        likes = 0;
      }
      if (check){
        likes++;
      } else {
        likes--;
      }
      return likes;
    }
    //Update the number of likes in the database (POST)
    function updateLikes(likes, id){
      $.ajax({
      type: 'POST',
      url: "/tweets/likes",
      data: {'likes': likes, 'id': id},
      dataType: "text"
      }).done(function(){
        console.log('complete update');
      });
    }
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

