$(document).ready(function() {
  const textAreaMaxChars = 140;
  let textArea = $('#tweet-text');
  textArea.on('input', function() {
    let counter = $(this).parent().find('.counter');
    counter.text(() => {
      if (textAreaMaxChars - $(this).val().length < 0) {
        counter.addClass('over');
      } else {
        counter.removeClass('over');
      }
      return textAreaMaxChars - $(this).val().length;
    });
  });
});