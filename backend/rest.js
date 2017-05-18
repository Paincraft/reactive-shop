var Express = require('express')
var BodyParser = require('body-parser');
var DBapi = require('./db/db_utils.js');
var ProductApi = require('./api/products.js');
var App = Express();
var Router = Express.Router(); 

var opts = {};
opts.isDB = false;

//Mongoose.connect('mongodb://localhost/test');
var setupPromise = new Promise((resolve,reject) => {
  DBapi.open('localhost', 27017, 'test').then((connection) => {
    opts.dbConn = connection; 
    opts.isDB = true;  
    console.log('db connection opened');
    var productApi = new ProductApi(opts);
    resolve(productApi);
  }).catch((error) => {
    reject(error);  
  }) 
})



/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    next();
}*/

setupPromise.then((productApi) => {
  App.use(BodyParser.json({limit: '5mb'}));
  App.use(BodyParser.urlencoded({limit: '5mb'}));
  //App.use(allowCrossDomain);  
  App.use('/api', Router);

  Router.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });

  Router.post('/product/saveproduct', productApi.saveProduct.bind(productApi));

  var server = App.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })  
}).catch((error) => {
  console.log(error);
})

//close cleaup
process.on('SIGTERM', function () {

   server.close(function () {
     console.log( "Closed out remaining connections.");
     // Close db connections, etc.
   });

   setTimeout( function () {
     console.error("Could not close connections in time, forcefully shutting down");
     process.exit(1); 
   }, 30*1000);

});