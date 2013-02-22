$(document).ready(function () {

  $('#tweetForm').submit(function (event) {

  	console.log('working');
    event.preventDefault();
    $.post("/tweets/:user", $('#tweetForm').serialize());
    
    $('#result').html("<p>Submitted!</p>")
    return false;
  })

})


