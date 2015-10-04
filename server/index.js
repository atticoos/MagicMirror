var express = require('express');
var exec = require('child_process').exec;
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var Config = require('../env.js');
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

app.listen(8090, function () {
  console.log('running');
});
