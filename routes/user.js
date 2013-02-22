
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
  var cash = "";
  var doneText = "no";
  var button = "";
  if(noteText.indexOf("@")==0){
    var spacer = noteText.indexOf(" ");
    payee = noteText.substring(1, spacer);
    if(noteText.indexOf("$")!=null){
      var sub = noteText.substring(noteText.indexOf("$"));
      var space2 = sub.indexOf(" ");
      if (noteText.indexOf("$")==null)
        cash = ""
      else if (space2==null)
        cash = sub  
      else
        cash = sub.substring(1, space2);
    }
  }
  if (cash != "")
    button = "Pay";
  else
    button = "Archive";
  if(cash==payee)
    button = "Archive";
    cash = ""

  var tweet = new Tweet({text: noteText, user: req.session.user.name, payTo: payee, money: cash, done:doneText, buttonText:button});
  console.log(tweet);
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
      req.session.user = user;
   	  user.save(function (err, docs){
   	    if (err)
   		  return console.log(err);
   	  });
    }
    else
      req.session.user = docs[0];
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
    console.log(docs[0]);
    if(docs[0].money!='')
      var userMinus = User.find({name:currentUser.name}).exec(function (err, m){
        console.log(docs[0].payTo);
        var userPlus = User.find({name:docs[0].payTo}).exec(function (err, p){
          console.log(p);
          var balanceMinus = parseFloat(currentUser.balance)-parseFloat(docs[0].money);
          var balancePlus = parseFloat(p[0].balance)+parseFloat(docs[0].money);
          var minus = new User({name: currentUser.name, balance:balanceMinus});
          var plus = new User({name:docs[0].payTo, balance:balancePlus});
          console.log(minus, plus);
          minus.save(function (err, docs){
          })
          req.session.user = minus;
          res.render('_balance', {userC:currentUser});
          plus.save(function (err,docs){
          })
          p[0].remove();
          m[0].remove();
        })
      })

    docs[0].remove();
    //res.render('_balance', {userC:req.session.user});

//    res.redirect('/cats');
//    console.log(burger)
  })
};

exports.balance = function(req,res){
  var currentUser= req.session.user;
  console.log(currentUser);
  res.render('_balance', {userC:currentUser});
}

