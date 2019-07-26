const faker = require('faker');
// const db = require('./db.js');
const db = require('./cassandra.js');
const concurrent = require('cassandra-driver').concurrent;
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
const generateProduct = () => {
  const name = faker.commerce.productName();
  const id = faker.random.alphaNumeric(8);

  // return [
  //   name, urlify(name) + '-' + faker.random.alphaNumeric(8), randomCondition(),
  //   parseFloat(faker.commerce.price()), sellerNote(), faker.date.future(1), faker.date.recent(-90), faker.random.number(75),
  //   faker.random.number(50), faker.address.country(), returnsAllowed()];

  return {
    id: id,
    name,
    url: urlify(name) + '-' + id,
    condition: randomCondition(),
    price: parseFloat(faker.commerce.price()),
    sellerNote: sellerNote(),
    expiresAt: faker.date.future(1),
    createdAt: faker.date.recent(-90),
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

// const seed = async (startId, endId) => {
//   console.time('seeder');
//   const loop = async (start, ending) => {
//     if (ending === 0) {
//       return Promise.resolve(true);
//     }
//     let end = ending > 159 ? 159 : ending
//     let fakeProducts = [];
//     for (let i = 0; i <= end; i++) {
//       fakeProducts.push({query: `INSERT INTO items (
//         id, name, url, condition, price,
//         sellerNote, expiresAt, createdAt, watchers, bids, shippingCountry,
//         returnsAllowed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, params: generateProduct()});
//     }
//     await db.client.batch(fakeProducts, {prepare: true});
//     let remaining = ending - end
//     console.log('Remaining: ' + remaining);
//     await loop(startId, remaining);
//   }
//   await loop(startId, endId)
//   console.timeEnd('seeder');
// };

const seed = async (startId, endId) => {
  console.time('seeder');
  let query = `INSERT INTO items (
             id, name, url, condition, price,
             sellerNote, expiresAt, createdAt, watchers, bids, shippingCountry,
             returnsAllowed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const loop = async (start, ending) => {
    if (ending === 0) {
      return Promise.resolve(true);
    }
    let end = ending > 50000 ? 50000 : ending
    let fakeProducts = [];
    for (let i = 0; i <= end; i++) {
      fakeProducts.push(generateProduct());
    }

    await concurrent.executeConcurrent(db.client, query, fakeProducts, { concurrencyLevel: 500 });
    let remaining = ending - end
    console.log('Remaining: ' + remaining);
    await loop(startId, remaining);
  }
  await loop(startId, endId)
  console.timeEnd('seeder');
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

  return db.client.connect()
    .then(() => db.client.execute('DROP TABLE IF EXISTS items'))
    .then(() => db.client.execute(db.Items))
    .catch((err) => {
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