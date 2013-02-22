
/*
 * GET users listing.
 */
var User = require('../models/user')
var Tweet = require('../models/tweet')

exports.tweetList = function(req, res){
  var tweets = Tweet.find({}).sort("-_id").exec(function (err, docs) {
    if (err)
      return console.log("error", orders);
    // send it back

    if(req.session.user==undefined)
      res.render('tweets', {styler:'tweetTemp_stylesheet.css', tweets: docs, title: "TWITTER"})
    else
      res.render('tweets', {styler:'tweet_stylesheet.css', tweets: docs, title: "TWITTER"})
  });
};

exports.newTweet = function(req, res){
  console.log(req.body.tweet);

  var tweet = new Tweet({text: req.body.tweet, user: req.session.user.name});

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
  res.render('newUser', {title: "Log in to TWITTER"});
};

exports.create = function(req, res){
  console.log("called");
  var user = new User({ name:req.body.uName});

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
    console.log(req.session.user);
    res.redirect('/');
  });
};

exports.update = function(req,res){
  var tweets = Tweet.find({}).sort("-_id").exec(function (err, docs) {
    console.log("HAHAHAHAHAHAHA");
    if (err)
      return console.log("error", ingredients);
    res.render('_twits', {tweets:docs});
  });
}