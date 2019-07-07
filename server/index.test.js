const rp = require('request-promise');
const { Product, mongoose } = require('./db.js');
const { handleSeeding } = require('./seedHelpers.js');
const { app } = require('./index.js');

const rpOptions = (endpoint) => {
  return {
    uri: `http://localhost:3001${endpoint}`,
    json: true
  };
};

describe('GET routes', () => {

  // Since the products could have any ids and names, we need to query the
  // database to get an actual product id and name. We can then use the id and
  // name to test the API routes.
  let productId;
  let productName;
  let expectedProduct;

  beforeAll(() => {
    return Product.findOne()
      .then((product) => {
        productId = product.id;
        productName = product['url-name'];
        expectedProduct = product.toObject(); // turns the mongoose model into a simpler object
      });
  });

  afterAll(() => {
    app.close();
    mongoose.disconnect();
  });

  // '/items/id/' routes
  test('/items/id/:id responds object of the correct structure', () => {
    return rp(rpOptions(`/items/id/${productId}`))
      .then(product => expect(Object.keys(product)).toEqual(Object.keys(expectedProduct)));
  });

  test('/items/id/:id responds object of the correct values', () => {
    return rp(rpOptions(`/items/id/${productId}`))
      .then(product => expect(product.name).toEqual(expectedProduct.name));
  });

  // '/items/name/' routes
  test('/items/name/:name responds object of the correct structure', () => {
    return rp(rpOptions(`/items/name/${productName}`))
      .then(product => expect(Object.keys(product)).toEqual(Object.keys(expectedProduct)));
  });

  test('/items/name/:name responds object of the correct values', () => {
    return rp(rpOptions(`/items/name/${productName}`))
      .then(product => expect(product.name).toEqual(expectedProduct.name));
  });

});