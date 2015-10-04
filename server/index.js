var express = require('express');
var exec = require('child_process').exec;
var app = express();

app.use(express.static('dist'));

app.get('/sha', function (req, res) {
  exec('git rev-parse HEAD', function (error, stdout) {
    res.json({data: stdout.toString()});
  });
});

app.listen(8090, function () {
  console.log('running');
});
