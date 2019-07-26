const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres@localhost:5432/bidbuy', {logging: false});
const Model = Sequelize.Model;

class Item extends Model {};

Item.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  condition: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  sellerNote: Sequelize.STRING,
  expiresAt: Sequelize.DATE,
  createdAt: Sequelize.DATE,
  watchers: Sequelize.INTEGER,
  bids: Sequelize.INTEGER,
  shippingCountry: Sequelize.STRING,
  returnsAllowed: Sequelize.BOOLEAN,
}, { sequelize, modelName: 'item' });


const getById = (id) => {
  return Item.findOne({ raw: true, where: { id: id }});
};

const getByName = (name) => {
  return Item.findOne({ raw: true, where: { url: name }});
};

const insertItem = (item) => {
  return Item.create(item);
}

const deleteItem = (id) => {
  return Item.destroy({where: {id: id}});
}

const updateItem = (id, updated) => {
  return Item.update(updated, {
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
  insertItem,
  deleteItem,
  sequelize,
  Item
};
