const express = require('express');
const process = require('process');
const db = require('./db.js');
const Product = require('./model.js');
require('dotenv').config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.static('public'));
db.handleConnect();

app.get('/items', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.json(err));
});

app.get('/items/id/:id', (req, res) => {
  const { id } = req.params;

  Product.findOne({ id })
    .then(product => res.json(product))
    .catch(err => res.json(err));
});

app.get('/items/name/:name', (req, res) => {
  const { name } = req.params;

  Product.findOne({ 'url-name': name })
    .then(product => res.json(product))
    .catch(err => res.json(err));
});

app.post('/bid/:id', (req, res) => {
  const { id } = req.params;
  const { bid } = req.body;

  const validateBid = (price) => {
    if (price < bid) {
      return true;
    }
    throw Error(`Bid of $${bid} is not greater than $${price}.`);
  };

  Product.findOne({ id })
    .then(product => product) // This shouldn't be necessary, but I get an error if I omit it
    .tap(product => validateBid(product.price))
    .then(product => product.bids + 1)
    .then(bids => Product.findOneAndUpdate({ id }, { price: bid, bids }, { new: true }))
    .then(updatedProduct => res.json(updatedProduct))
    .catch(err => res.json({ error: true, message: err.message }));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = {
  app,
};
