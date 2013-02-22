$(document).ready(function () {

  $('#tweetForm').submit(function (event) {

    event.preventDefault();
    $.post("/tweets/:user", $('#tweetForm').serialize());
    
    $('#result').html("<p>Submitted!</p>")

    $.get("/tweets/update",function(data){
      $('#topper').remove();
      $('#tweets').append(data);
    })
    return false;
  })

  $('.button').click(function (event) {
    event.preventDefault();
    var id = $(this).attr('id');
    var response = {};
    response.tweet = id;
    console.log("delete");
    $.post("/users/delete", response);
    $('div[id="'+id+'"]').remove();
  })


})


