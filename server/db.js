const process = require('process');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('dotenv').config();

const database = process.env.DB_NAME;

// TODO: read DB host in from environment variable

const handleConnect = () => {
  if (mongoose.connection.readyState === 0) { // not connected to database
    return mongoose.connect(`mongodb://mongo:27017/${database}`, { useNewUrlParser: true, useCreateIndex: true });
  }
  return Promise.resolve(false); // already connected
};

module.exports = {
  database,
  mongoose,
  handleConnect,
};
