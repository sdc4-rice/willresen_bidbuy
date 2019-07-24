const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres@localhost:5432/bidbuy');
const Model = Sequelize.Model;

class Product extends Model {};

Product.init({
  id: {
    type: Sequelize.DECIMAL,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  condition: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  sellerNote: Sequelize.STRING,
  expiresAt: Sequelize.DATE,
  watchers: Sequelize.DECIMAL,
  bids: Sequelize.DECIMAL,
  shippingCountry: Sequelize.STRING,
  returnsAllowed: Sequelize.BOOLEAN,
}, { sequelize, modelName: 'product' });


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });












// module.exports = {
//   databaseName,
//   mongoose,
//   handleConnect,
// };