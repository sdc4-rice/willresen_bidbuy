const faker = require('faker');
const db = require('./db.js');
const Product = require('./model.js');
require('dotenv').config();

// HELPER FUNCTIONS
const randomCondition = () => {
  const conditions = ['New', 'Mint', 'Used', 'Fair'];
  return conditions[faker.random.number(3)];
};

// Roughly half the products should have notes from the seller
const sellerNote = () => (Math.random() > 0.5 ? faker.lorem.sentence() : '');

// Returns a URL-friendly version of the given string. For example,
// 'John O'Riley' => 'john-oriley'.
// This function helps produce names that can be used in API requests.
const urlify = string => string.toLowerCase()
  .replace(/\s/g, '-')
  .replace(/[^a-zA-Z\-\d]/g, ''); // strip out any character that is not a letter, digit, or hyphen

// Roughly 80% of the products should be returnable
const returnsAllowed = () => Math.random() < 0.8;

// Returns an object representing a fake product
const generateProduct = (id) => {
  const name = faker.commerce.productName();

  return {
    id,
    name,
    'url-name': urlify(name),
    condition: randomCondition(),
    price: parseFloat(faker.commerce.price()),
    sellerNote: sellerNote(),
    expiresAt: faker.date.recent(-30), // a date up to 30 days in the future
    watchers: faker.random.number(75),
    bids: faker.random.number(50),
    shippingCountry: faker.address.country(),
    returnsAllowed: returnsAllowed(),
  };
};

// MAIN FUNCTIONS
// This function generates fake products and adds them to the database. It
// returns a promise that resolves once all fake products have been added to the
// database.
const seed = (startId, endId) => {
  const fakeProducts = [];
  for (let i = startId; i <= endId; i += 1) {
    fakeProducts.push(generateProduct(i));
  }

  return db.handleConnect()
    .then(() => Product.insertMany(fakeProducts));
};

// This function drops the existing collection, runs `seed` to seed the
// database with new products, and finally logs a message to the console when
// it is done. You'll probably want to call this function instead of calling
// `seed` directly.
// Configure `startId` and `endId` via START_ID and END_ID environment variables.
const handleSeeding = () => {
  const startId = Number(process.env.START_ID) || 100;
  const endId = Number(process.env.END_ID) || 200;

  console.log('Seeding database...');
  console.log(`Adding items with ids ${startId} to ${endId}`);

  return db.handleConnect()
    .then(() => Product.collection.drop())
    .catch((err) => {
      if (err.code === 12587) {
        return; // The collection doesn't exist, so it's OK that it wasn't dropped
      }
      console.log('Error dropping collection:', err);
      throw err;
    })
    .then(() => seed(startId, endId))
    .then(() => console.log('Database successfully seeded. Have a nice day.'))
    .catch((err) => {
      console.log('Error seeding database:', err);
      throw err;
    });
};

module.exports = {
  generateProduct,
  seed,
  handleSeeding,
};
