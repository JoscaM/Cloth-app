var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Item = new Schema({
  img: {
    type: String
  },
  price: {
    type : String
  },
  brand : {
    type : String
  },
  type : {
    type :String
  }
},{
    collection: 'items'
});

module.exports = mongoose.model('Item', Item);
