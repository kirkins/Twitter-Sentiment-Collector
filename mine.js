// See config file for values needed on setup
const config = require('./config/config');
// If not provided a search term by user thorough an error
var searchTerm;
if(process.argv[2]){
  searchTerm = process.argv[2];
} else {
  console.log("Error: please provide query");
  process.exit();
}

const fs = require('fs');
const Twit = require('twit');
const sentiment = require('sentiment');
const path = require('path');

var Bot = new Twit({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

var dataDirectory = 'data/' + searchTerm+'.json';
const filePath = path.join(__dirname, dataDirectory);

if (!fs.existsSync(dataDirectory)){
    fs.writeFile(filePath,'{"lastReplied":0}');
}

var jsonData;
fs.readFile(filePath, {encoding: 'utf8'}, function(err,data){
    if (!err){
    jsonData = JSON.parse(data);
    tweetAnalysis(searchTerm);
    }else{
        console.log(err);
    }
});


function tweetAnalysis() {

  var query = {
    q: searchTerm,
    count: 100,
    result_type: "recent",
    since_id: jsonData.lastReplied
  }

  Bot.get('search/tweets', query, BotGotLatestTweet);

  function BotGotLatestTweet(error, data, response) {
    if (error) {
      console.log('Bot could not find latest tweet, : ' + error);
    } else {
      var tweetScores = [];
      jsonData["lastReplied"] = data.statuses[0].id;
      for (var i = 0, len = data.statuses.length; i < len; i++) {
        tweetScores.push(analyzeTweet(data.statuses[i]));
      }

      var scoreOccurances = countOccurrence(tweetScores);

      for( var i = 0; i < scoreOccurances[0].length; i++) {
        if (jsonData[scoreOccurances[0][i]]){
          jsonData[scoreOccurances[0][i]] = jsonData[scoreOccurances[0][i]] + scoreOccurances[1][i];
        } else {
          jsonData[scoreOccurances[0][i]] = scoreOccurances[1][i];
        }

      }
      console.log(JSON.stringify(jsonData));
      saveToCsv(JSON.stringify(jsonData));
      return jsonData;
    }
  }

  function analyzeTweet(tweet) {
    var tweetId = tweet.id_str;
    var username = tweet.screen_name;
    var tweetText = tweet.text;
    var r1 = sentiment(tweetText);
    var roundCompare = Math.round(r1.comparative * 10);
    return roundCompare;
  }

}

function countOccurrence(arr) {
  var a = [], b = [], prev;

  arr.sort();
  for ( var i = 0; i < arr.length; i++ ) {
      if ( arr[i] !== prev ) {
          a.push(arr[i]);
          b.push(1);
      } else {
          b[b.length-1]++;
      }
      prev = arr[i];
  }

  return [a, b];
}

function saveToCsv(text) {
  fs.writeFile(filePath, text, function(err) {
      if(err) {
          return console.log(err);
      }
  });
}

var timer = setInterval(tweetAnalysis, config.TWEET_FREQUENCY * 60 * 60 * 10);
console.log("program started analyzing 100 tweets every " + config.TWEET_FREQUENCY +" minutes" );
console.log("Sentiment data will be shown as an array below");
