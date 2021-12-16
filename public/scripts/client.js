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
  tweets.forEach(tweet => {
    let tweetElements = createTweetElement(tweet)
    tweetContainer.prepend(tweetElements);
  });
}
const createTweetElement = (tweetData) => {
  const $tweet = $(`<article>`).addClass('tweet')
  console.log(tweetData);
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
      <span>${timeago().format(tweetData.created_at)}</span>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </div>`
  let tweetElement = $tweet.append(html);
  // document.getElementById('id-tweet').innerHTML = tweetElement;
  return tweetElement;
}

const $tweet = createTweetElement(tweetData);

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


// $('#tweets-container').append($tweet);
// const $tweet = createTweetElement(tweetData);
$(document).ready(function () {
  renderTweet(data);
})