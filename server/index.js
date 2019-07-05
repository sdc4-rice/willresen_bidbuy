const express = require('express');
const { Product } = require('./db.js');

const port = 3001;
const app = express();

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});