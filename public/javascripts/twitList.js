$(document).ready(function () {

  $('#tweetForm').submit(function (event) {

  	console.log('working');
    event.preventDefault();
    $.post("/tweets/:user", $('#tweetForm').serialize());
    
    $('#result').html("<p>Submitted!</p>")

    function toRepeat () {
      $.get("/tweets/update",function(data){
        $('#topper').remove();
        $('#tweets').append(data);
      })
    }    
    var timer = setInterval(function(){toRepeat()}, 1000);
    return false;
  })


})


