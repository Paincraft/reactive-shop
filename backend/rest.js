var Express = require('express')
var BodyParser = require('body-parser');
var Fs = require('fs');
var Gridfs = require('gridfs-stream');
var Base64 = require('base64-stream');
//var dbApi = require('./db/mongo_test.js');
var ReadableStream = require('stream').Readable;
var Product = require('./db/models/product.js');
var App = Express();
var Router = Express.Router();

Mongoose.connect('mongodb://localhost/test');
var dbConn = mongoose.connection;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

App.use(BodyParser.json({limit: '5mb'}));
App.use(BodyParser.urlencoded({limit: '5mb'}));
App.use(allowCrossDomain);
App.use('/api', Router);

Router.post('/product/saveproduct', function (req, res) {
  var fileExtension = req.body.fileExtension;

  var product = new Product();
  product.name = req.body.name;
  product.description = req.body.description;
  product.category = req.body.category;
  product.thumbnailId = `${product.name}-${new Date().getTime()}.${fileExtension}`;

  Grid.mongo = Mongoose.mongo;

  conn.once('open', function () {
    console.log('open');
    var gfs = Grid(dbConn.db);

    // streaming to gridfs
    //filename to store in mongodb
    var writestream = gfs.createWriteStream({
        filename: product.thumbnailId
    });

    var s = new ReadableStream;
    s.push('your text here');
    s.push(null);

    s.pipe(Base64.decode()).pipe(writestream);

    writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename + 'Written To DB');
        product.save(function(err){
          if (err) {
            console.log(err);
          } else {
            console.log('product saved');
          }
        })
    });

})

App.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
