var mongoose = require('mongoose');

// Define our beer schema
var productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  tags: [String],
  thumbnailId: String,
  stock: {type: Number, default: 0},
  hidden: {type: Boolean, default: false},
  meta: {
    favs: {type: Number, default: 0},
    comments: [String]
  }
});

// Export the Mongoose model
module.exports = mongoose.model('Product', productSchema);
