const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres@localhost:5432/bidbuy');
const Model = Sequelize.Model;

class Item extends Model {};

Item.init({
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
}, { sequelize, modelName: 'item' });


  const getById = (id) => {
    return Item.findOne({where: {id: id}});
  };

  const getByName = (name) => {
    return Item.findOne({where: {name: name}});
  };


module.exports = {
  getById,
  getByName
};
