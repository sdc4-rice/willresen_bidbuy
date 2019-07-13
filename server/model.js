const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  'url-name': {
    type: String,
    unique: true,
  },
  condition: String,
  price: Number,
  sellerNote: String,
  expiresAt: Date,
  watchers: Number,
  bids: Number,
  shippingCountry: String,
  returnsAllowed: Boolean,
});

module.exports = mongoose.model('Product', productSchema);
