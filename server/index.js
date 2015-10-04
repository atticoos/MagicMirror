var express = require('express');
var exec = require('child_process').exec;
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var Twitter = require('twitter');
var Config = require('../env.js');
var _ = require('lodash');
var app = express();

app.use(express.static('dist'));

app.get('/sha', function (req, res) {
  exec('git rev-parse HEAD', function (error, stdout) {
    res.json({sha: stdout.toString()});
  });
});

app.get('/weather', function (req, res) {
  var endpoint = 'https://api.forecast.io/forecast/' + Config.forecastio.access_token + '/';
  endpoint += '43.918364,-78.683535';
  request(endpoint).spread(function (response, body) {
    res.json(JSON.parse(body));
  });
});

app.get('/tweets', function (req, res) {
  var twitter = new Twitter(Config.twitter),
      screennames = req.query.screennames.split(',');

  function getTweets (screenname) {
    return new Promise(function (resolve, reject) {
      twitter.get('statuses/user_timeline', {
        screenname: screenname,
        count: 3
      }, function (error, tweets) {
        if (error) {
          reject(error);
        } else {
          resolve(tweets);
        }
      });
    });
  }

  var requests = _.map(screennames, function (screenname) {
    return getTweets(screenname);
  });

  Promise.all(requests)
  .then(_.flatten)
  .then(res.json.bind(res));
});

app.get('/github', function (req, res) {
  var options = {
    url: 'https://api.github.com/notifications?access_token=' + Config.github.access_token,
    headers: {
      'User-Agent': 'Magic-Mirror-App'
    }
  };
  request(options).spread(function (response, body) {
    res.json(JSON.parse(body));
  }).catch(function (err) {
    res.json(err);
  });
});

app.listen(8090, function () {
  console.log('running');
});
