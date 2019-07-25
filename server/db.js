const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres@localhost:5432/bidbuy');
const Model = Sequelize.Model;

class Item extends Model {};

Item.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  condition: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  sellerNote: Sequelize.STRING,
  expiresAt: Sequelize.DATE,
  watchers: Sequelize.INTEGER,
  bids: Sequelize.INTEGER,
  shippingCountry: Sequelize.STRING,
  returnsAllowed: Sequelize.BOOLEAN,
}, { sequelize, modelName: 'item' });


const getById = (id) => {
  return Item.findOne({ raw: true, where: { id: id } });
};

const getByName = (name) => {
  return Item.findOne({ raw: true, where: { name: name } });
};

const updateItem = (id, bids, price) => {
  return Item.update({
    bids: bids,
    price: price
  }, {
      where: {
        id: id
      },
      returning: true,
      raw: true
    });
};


module.exports = {
  getById,
  getByName,
  updateItem,
  sequelize,
  Item
};
