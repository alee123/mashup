var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({
  text: String,
  user: String
});

var Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
