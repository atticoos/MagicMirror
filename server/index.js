var express = require('express');
var app = express();

app.use(express.static('dist'));
app.listen(8090, function () {
  console.log('running');
});
