const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/products-bid-buy', {useNewUrlParser: true});

const Product = mongoose.model('Product', {
  id: {
    type: Number,
    unique: true
  },
  name: String,
  'url-name': {
    type: String,
    unique: true
  },
  condition: String,
  price: Number,
  sellerNote: String,
  expiresAt: Date,
  watchers: Number,
  bids: Number,
  shippingCountry: String,
  returnsAllowed: Boolean
});

module.exports.Product = Product;