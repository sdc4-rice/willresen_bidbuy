const express = require('express');
const cors = require('cors');
const db = require('./db.js');
require('dotenv').config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

//find product by id
app.get('/items/id/:id', (req, res) => {
  db.getById(req.params.id)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

 //find product by name
app.get('/items/name/:name', (req, res) => {
  db.getByName(req.params.name)
  .then(results => res.send(results))
  .catch(err => console.log(err));
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

  // find a product by id
  db.getById(id)
    .tap(results => validateBid(results))
    .then(item => item.bids + 1)
    .then(bid => db.updateItem(id, bid.bids, bid.price))
    .then(updatedItem => res.json(updatedItem))
    .catch(err => res.json({ error: true, message: err.message }));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = {
  app,
};
