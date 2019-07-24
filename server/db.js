// const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
// require('dotenv').config();

// const databaseName = process.env.DB_NAME;
// const databaseHost = process.env.DB_HOST || 'localhost';

// const handleConnect = () => {
//   if (mongoose.connection.readyState === 0) { // not connected to database
//     return mongoose.connect(`mongodb://${databaseHost}:27017/${databaseName}`, { useNewUrlParser: true, useCreateIndex: true });
//   }
//   return Promise.resolve(false); // already connected
// };

// module.exports = {
//   databaseName,
//   mongoose,
//   handleConnect,
// };
