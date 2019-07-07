const rp = require('request-promise');
const db = require('./db.js');
const Product = require('./model.js');
const { handleSeeding, seed } = require('./seedHelpers.js');
const { app } = require('./index.js');


// `rpOptionsGet` and `rpOptionsPost` generate options objects for rp.
const rpOptionsGet = (endpoint) => {
  return {
    uri: `http://localhost:3001${endpoint}`,
    json: true
  };
};

const rpOptionsPost = (id, bid) => {
  return {
    method: 'POST',
    url: `http://localhost:3001/bid/${id}`,
    body: {bid},
    json: true
  };
};

// The database should be seeded with `npm run seed` before these tests are run.
describe('API routes', () => {

  // Since the products could have any ids and names, we need to query the
  // database to get an actual product id and name. We can then use the id and
  // name to test the API routes.
  let productId;
  let productName;
  let expectedProduct;

  beforeAll(() => {
    return db.handleConnect()
      .then(() => Product.findOne())
      .then((product) => {
        productId = product.id;
        productName = product['url-name'];
        expectedProduct = product.toObject(); // turns the mongoose model into a simpler object
      });
  });

  afterAll(() => {
    app.close();
    db.mongoose.disconnect();
  });

  // GET '/items/id/' routes
  test('/items/id/:id responds object of the correct structure', () => {
    return rp(rpOptionsGet(`/items/id/${productId}`))
      .then(product => expect(Object.keys(product)).toEqual(Object.keys(expectedProduct)));
  });

  test('/items/id/:id responds object of the correct values', () => {
    return rp(rpOptionsGet(`/items/id/${productId}`))
      .then(product => expect(product.name).toEqual(expectedProduct.name));
  });

  // GET '/items/name/' routes
  test('/items/name/:name responds object of the correct structure', () => {
    return rp(rpOptionsGet(`/items/name/${productName}`))
      .then(product => expect(Object.keys(product)).toEqual(Object.keys(expectedProduct)));
  });

  test('/items/name/:name responds object of the correct values', () => {
    return rp(rpOptionsGet(`/items/name/${productName}`))
      .then(product => expect(product.name).toEqual(expectedProduct.name));
  });

  // POST '/bid/' route
  test('/bid/:id responds with an error object if bid is too low', () => {
    return rp(rpOptionsPost(productId, expectedProduct.price - 1))
      .then(res => expect(res.error).toEqual(true));
  });

  test('/bid/:id responds with the updated if product if the bid is high enough', () => {
    return rp(rpOptionsPost(productId, expectedProduct.price + 1))
      .then(product => expect(product.bids).toEqual(expectedProduct.bids + 1));
  });
});