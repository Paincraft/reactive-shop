var express = require('express')
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(bodyParser.json());
app.use(allowCrossDomain);

app.post('/product/saveproduct', function (req, res) {
  console.log(req.body.imgData.substring(0,30));
  fs.writeFile("out.png", req.body.imgData, 'base64', function(err) {
    console.log(err);
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
