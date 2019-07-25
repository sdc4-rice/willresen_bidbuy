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

//add a listing to the database
app.post('/items', (req, res) => {
  db.addItem(req.body)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

//remove a listing from the database
app.delete('/items/id/:id', (req, res) => {
  db.deleteItem(req.params.id)
    .then(results => res.sendStatus(200))
    .catch(err => console.log(err))
});

//post a bid to a listing
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
    .tap(results => validateBid(results.price))
    .tap(item => item.bids += 1)
    .then(item => db.updateItem(id, item.bids, parseFloat(bid)))
    .then(updatedItem => res.json(updatedItem[1][0]))
    .catch(err => res.json({ error: true, message: err.message }));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = {
  app,
};
