const { Product, mongoose } = require('./db.js');
const rp = require('request-promise');
const { app } = require('./index.js');

describe('GET routes', () => {

  // Since the products could have any ids and names, we need to query the
  // database to get an actual product id and name. We can then use the id and
  // name to test the API routes.
  let productId;
  let productName;

  beforeAll(() => {
    return Product.find()
      .then(([product, ...others]) => {
        productId = product.id;
        productName = product['url-name'];
      });
  });

  afterAll(() => {
    app.close();
    mongoose.disconnect();
  });

  test('/items/id/:id responds with JSON object', () => {
    console.log(productId);
    return rp(`http://localhost:3001/items/id/${productId}`)
      .then(productJSON => JSON.parse(productJSON))
      .then(product => expect(typeof product).toBe('object'));
  });

  test('/items/name/:name responds with JSON object', () => {
    console.log(productId);
    return rp(`http://localhost:3001/items/name/${productName}`)
      .then(productJSON => JSON.parse(productJSON))
      .then(product => expect(typeof product).toBe('object'));
  });
});