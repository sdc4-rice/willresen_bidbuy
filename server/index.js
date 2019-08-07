require('newrelic');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const React = require('react');
const db = require(`./${process.env.DATABASE}.js`);
const ReactDOMServer = require('react-dom/server');
const BidBuy = require('../client/dist/BidBuy.js');
const { ServerStyleSheet } = require('styled-components');

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const handleRender = (req, res) => {
  db.getById(req.query.id)
    .then(results => {
      /* Generate HTML for the stylized-component */
      const sheet = new ServerStyleSheet();
      const html = ReactDOMServer.renderToString(sheet.collectStyles(React.createElement(BidBuy.default, { product: results })));
      const styleTags = sheet.getStyleTags();
      sheet.seal();
      /* Get HTML from the template and insert the component's HTML */
      fs.readFile('./public/template.html', 'utf8', (err, data) => {
        if (err) throw err;
        const document = data.replace(/<div id="bid-buy"><\/div>/, `<div id="bid-buy">${html}</div><script src="bundle.js"></script>`)
          .replace(/<\/head>/, `${styleTags}</head>`);
        res.send(document);
      });
    })
};

app.get('/', handleRender);

//find product by id
app.get('/items/id/:id', (req, res) => {
  db.getById(req.params.id)
    .then(results => res.send(results))
});

 //find product by name
app.get('/items/name/:name', (req, res) => {
  db.getByName(req.params.name)
    .then(results => res.send(results))
});

//add a listing to the database
app.post('/items', (req, res) => {
  db.insertItem(req.body)
    .then(results => {
      res.send(results)
    })
});

//update an existing listing
app.put('/items/id/:id', (req, res) => {
  db.updateItem(req.params.id, req.body)
    .then(results => res.json(results[1][0]))
})

//remove a listing from the database
app.delete('/items/id/:id', (req, res) => {
  db.deleteItem(req.params.id)
    .then(results => res.sendStatus(200))
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
    .then(item => db.updateItem(id, {bids: item.bids, price: parseFloat(bid)}))
    .then(updatedItem => res.json(updatedItem[1][0]))
    .catch(err => res.json({ error: true, message: err.message }));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = {
  app,
};
