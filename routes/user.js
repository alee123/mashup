
/*
 * GET users listing.
 */
var User = require('../models/user')
var Tweet = require('../models/tweet')

exports.tweetList = function(req, res){
  var currentUser= req.session.user;
  if(req.session.user==undefined)
    res.redirect('/users/new');
  else
    var tweets = Tweet.find({$or:[{user:currentUser.name}, {payTo: currentUser.name}]}).sort("-_id").exec(function (err, docs) {
      if (err)
        return console.log("error", orders);
      // send it back
        res.render('tweets', {styler:'/stylesheets/tweet_stylesheet.css', userC: req.session.user, tweets: docs})
  });
};

exports.newTweet = function(req, res){
  var noteText = req.body.tweet;
  var payee = "";
  var payment = "";
  if(noteText.indexOf("@")==0){
    var spacer = noteText.indexOf(" ");
    var payee = noteText.substring(1, spacer);
    if(noteText.indexOf("$")!=null){
      var sub = noteText.substring(noteText.indexOf("$"));
      var space2 = sub.indexOf(" ");
      var payment = sub.substring(1, space2);
      console.log(payment);
    }
  }
  var tweet = new Tweet({text: noteText, user: req.session.user.name, payTo: payee, money: payment});

  if(req.body.tweet.length>140){
    return console.log("doesn't work");
  }
  tweet.save(function (err) {
    if (err)
      return console.log(err);
    // redirect to the list of users
  });
};

exports.input = function(req, res){
  res.render('newUser', {});
};

exports.create = function(req, res){
  var user = new User({ name:req.body.uName, balance:"50.00"});

  req.session.user = user;
  var users = User.find({name:req.body.uName}).exec(function (err, docs) {
    if (err)
      return console.log("error", ingredients);
      // send it back
    if (docs[0] == null) {
   	  user.save(function (err, docs){
   	    if (err)
   		  return console.log(err);
   	  });
    }
    res.redirect('/');
  });
};

exports.update = function(req,res){
  var currentUser= req.session.user;
  var tweets = Tweet.find({$or:[{user:currentUser.name}, {payTo: currentUser.name}]}).sort("-_id").exec(function (err, docs) {
    if (err)
      return console.log("error", ingredients);
    res.render('_twits', {tweets:docs});
  });
}

exports.delete = function(req,res){
  var text = req.body;
  var tweetFind = Tweet.find({text:text.tweet}).exec(function (err,docs) {
    if (err)
      return console.log("UH OH");
    var currentUser= req.session.user; 
    docs[0].remove();
//    res.redirect('/cats');
//    console.log(burger)
  })
};