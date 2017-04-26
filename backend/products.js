var mongoose = require('mongoose');

// Define our beer schema
var poductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  tags: [String],
  thumbnailId: String,
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Product', productSchema);
