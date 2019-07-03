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

// Returns a URL-friendly version of the given string. For example, 'John O'Riley' => 'john-oriley'.
// This function will help produce names that can be more easily used in API requests.
const urlify = (string) => {
  return string.toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z\-\d]/g, '');
};

// Roughly 80% of the productes should be returnable
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
    price: faker.commerce.price(),
    sellerNote: sellerNote(),
    expiresAt: faker.date.recent(-30), // a date up to 30 days in the future
    watchers: faker.random.number(75),
    bids: faker.random.number(50),
    country: faker.address.country(),
    returnsAllowed: returnsAllowed()
  };
};

// MAIN FUNCTION
// This function generates fake produces and adds them to the database. It returns
// a promise that resolves once all fake products have been added to the database.
const generate = (startId, endId) => {
  console.log('Seeding database...');
  console.log(`Adding items with ids ${startId} to ${endId}`);

  const fakeProducts = [];

  for (let i = startId; i <= endId; i++) {
    fakeProducts.push(generateProduct(i));
  }

  return db.Product.insertMany(fakeProducts);
};

// This function automatically runs when this file is run. Configure `startId`
// and `endId` as desired. Note: This drops the existing collection before adding
// new data to it.
const seedDatabase = (() => {
  const startId = 100;
  const endId = 110;

  db.Product.collection.drop()
    .then(generate(10, 20))
    .then(() => console.log('Database successfully seeded. Have a nice day.'))
    .catch(err => console.log('Error seeding database: ', err));
})();