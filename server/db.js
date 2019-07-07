const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const database = 'products-bid-buy';

const handleConnect = () => {
  if (mongoose.connection.readyState === 0) { // not connected to database
    const dbName = 'products-bid-buy';
    return mongoose.connect(`mongodb://localhost:27017/${database}`, {useNewUrlParser: true, useCreateIndex: true});
  }
  return Promise.resolve(false); // already connected
};

module.exports = {
  database,
  mongoose,
  handleConnect
};