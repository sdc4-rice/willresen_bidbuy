const express = require('express');
const { Product } = require('./db.js');

const port = 3001;
const app = express();

app.use(express.json());

app.get('/items/id/:id', (req, res) => {
  const id = req.params.id;

  Product.find({id})
    .then(product => res.json(product))
    .catch(err => res.json(err));
});

app.get('/items/name/:name', (req, res) => {
  const name = req.params.name;

  Product.find({'url-name': name})
    .then(product => res.json(product))
    .catch(err => res.json(err));
});

app.post('/bid/:id', (req, res) => {
  const id = req.params.id;
  const bid = req.body.bid;

  const validateBid = (price) => {
    if (price < bid) {
      return true;
    }
    throw 'Bid too low';
  };

  Product.findOne({id})
    .then(product => validateBid(product.price))
    .then(() => Product.findOneAndUpdate({id}, {price: bid}))
    .then(newProduct => res.json(newProduct))
    .catch(err => res.json({error: true, message: err}));

  // Product.findOneAndUpdate({id}, {price})
  //   .then(dbResponse => res.json(dbResponse))
  //   .catch(err => res.json(err));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});