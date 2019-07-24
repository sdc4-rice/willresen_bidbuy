const express = require('express');
const cors = require('cors');
const db = require('./db.js');
require('dotenv').config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

//retrieve all products from database
app.get('/items', (req, res) => {

});

//find product by id
app.get('/items/id/:id', (req, res) => {
  const { id } = req.params;

});

 //find product by name
app.get('/items/name/:name', (req, res) => {
  const { name } = req.params;


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
  // validate that its current price < bid price
  // if it is, add one to the number of bids. if not, make sure to use .catch
          // and send "res.json({ error: true, message: err.message });"

  // update the database entry with new number of bids and new price
  // return updated database entry to client

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = {
  app,
};
