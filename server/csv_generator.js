const fs = require('fs');
const faker = require('faker');
require('dotenv').config();
const { exec } = require('child_process');

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
  const name = faker.commerce.productName();;

  return {
    id: faker.random.alphaNumeric(15),
    name,
    url: urlify(name) + '-' + faker.random.alphaNumeric(3),
    condition: randomCondition(),
    price: parseFloat(faker.commerce.price()),
    sellerNote: sellerNote(),
    expiresAt: faker.date.future(1).toUTCString().replace(',', ''),
    createdAt: faker.date.recent(-90).toUTCString().replace(',', ''),
    watchers: faker.random.number(75),
    bids: faker.random.number(50),
    shippingCountry: faker.address.country().replace(',', ''),
    returnsAllowed: returnsAllowed(),
  };
};

let stream = fs.createWriteStream(__dirname + '/mockData.csv');

const generateRows = (rows) => {
  const write = async () => {
    let ok = true;
    while (ok && rows > 0) {
      ok = await stream.write(Object.values(generateProduct()).join(',') + '\r\n', err => err && console.log(err));
      rows--;
    }
    console.log('Remaining: ' + rows);
    rows > 0 && await stream.once('drain', write);
  }
  write();
  return Promise.resolve(true);
};

generateRows(100) //define the number of rows to generate