const db = require('./db.js');
const faker = require('faker');

// HELPER FUNCTIONS
const randomCondition = () => {
  const conditions = ['New', 'Mint', 'Used', 'Fair'];
  return conditions[faker.random.number(3)];
};

// Roughly half the products should have notes from the seller
const sellerNote = () => {
  return Math.random() > 0.5 ? faker.lorem.sentence() : '';
};

// Returns a URL-friendly version of the given string. For example,
// 'John O'Riley' => 'john-oriley'.
// This function helps produce names that can be used in API requests.
const urlify = (string) => {
  return string.toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z\-\d]/g, ''); // strip out any character that is not a letter, digit, or hyphen
};

// Roughly 80% of the products should be returnable
const returnsAllowed = () => {
  return Math.random() < 0.8;
};

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
    returnsAllowed: returnsAllowed()
  };
};

// MAIN FUNCTIONS
// This function generates fake products and adds them to the database. It
// returns a promise that resolves once all fake products have been added to the
// database.
const seed = (startId, endId) => {
  console.log('Seeding database...');
  console.log(`Adding items with ids ${startId} to ${endId}`);

  const fakeProducts = [];
  for (let i = startId; i <= endId; i++) {
    fakeProducts.push(generateProduct(i));
  }

  return db.Product.insertMany(fakeProducts);
};

// This function drops the existing collection, runs `seed` to seed the
// database with new products, and finally logs a message to the console when
// it is done. You'll probably want to call this function instead of calling
// `seed` directly.
// Configure `startId` and `endId` defaults as desired.
const handleSeeding = (startId = 100, endId = 110) => {
  db.Product.collection.drop()
    .then(seed(startId, endId))
    .then(() => console.log('Database successfully seeded. Have a nice day.'))
    .catch(err => console.log('Error seeding database: ', err));
};

module.exports = {
  generateProduct,
  handleSeeding
};