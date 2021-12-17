// const { reset } = require("nodemon");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}
// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// to see what it looks like
// to add it to the page so we can make sure it's got all the right elements, classes, etc.
const renderTweet = (tweets) => {
  let tweetContainer = $('#tweetContainer').html('')
  tweets.reverse().forEach(tweet => {
    let tweetElements = createTweetElement(tweet)
    tweetContainer.prepend(tweetElements);
  });
}
const createTweetElement = (tweetData) => {
  const $tweet = $(`<article>`).addClass('tweet')
  // console.log(tweetData);
  let html = `
    <div>
      <div class="tweet-profile">
        <div class='imagename'>
         <img src="${tweetData.user.avatars}" />
        <p>${tweetData.user.name}</p>
      </div>
        <p>${tweetData.user.handle}</p>
      </div>
    </div>
    <div class="tweet-desciption">
    ${tweetData.content.text}
    </div>
    <div class="tweet-footer">
      <span>${timeago().format(tweetData.created_at +420000)}</span>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </div>`
  let tweetElement = $('#tweetContainer').append(html);
  // document.getElementById('id-tweet').innerHTML = tweetElement;
  return tweetElement;
}

const $tweet = createTweetElement(tweetData);
$(document).ready(function () {
  // Submit tweet
  $("#tweetForm").on('submit', function (event) {
    event.preventDefault();
    const tweetValue = $("#tweet-text").val()
    if (!isTweetTextValid(tweetValue)) {
      return alert("Invalid Tweet Length");
    };
    console.log(event.target);
    console.log(this);
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    }).then(data => {
      loadTweets();
    })
    $('form').trigger('reset');
  })
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then((data) => {
        renderTweet(data);
      })
      .catch((err) => console.log(err));
  };
  loadTweets();
});

const isTweetTextValid = (tweetText) => {
  if (tweetText.length > 140) {
    return false;
  }
  return true;
}

