var mongoose = require('mongoose');

module.exports = {
  test: function(){
    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('Connected o db');
    });
    db.close();
  }
}
