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
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
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
  let html = `
<article class="tweetbody">
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
      ${escape(tweetData.content.text)}
    </div>
    <div class="tweet-footer">
      <span>${timeago().format(tweetData.created_at)}</span>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </div>
    </article>`
  let tweetElement = $('#tweetContainer').append(html);
  return tweetElement;
}


const $tweet = createTweetElement(tweetData);
$(document).ready(function () {
  // Submit tweet
  $("#tweetForm").on('submit', function (event) {
    event.preventDefault();
    const tweetValue = $("#tweet-text").val()
    if (!isTweetTextValid(tweetValue)) {
      return renderError("⚠️Tweet is too long!⚠️");
    };
    if (tweetValue === '') {
      return renderError("⚠️Tweet cannot be empty!⚠️");
    }
    console.log(event.target);
    console.log(this);
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    }).then(data => {
      loadTweets();
      
      $('.counter').val(140);
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
  
const renderError = function (message) {
  $(".error").slideDown().text(message)
};

$(".error").slideUp()
