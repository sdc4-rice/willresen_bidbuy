require('dotenv').config();
const faker = require('faker');
const fs = require('fs');
const util = require('util')
const exec = util.promisify(require('child_process').exec);
const db = require(`./${process.env.DATABASE}.js`);


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

const generateRows = async (rows) => {
  console.log('Starting to generate...');
  console.time('Seeder');
  /* Verify that the PostgreSQL db is running */
  db.sequelize.authenticate()
    .then(() => db.sequelize.sync({ force: true }))
    .catch(() => process.exit(0))

  const write = async () => {
    let ok = true;
    while (ok && rows > 0) {
      ok = await stream.write(Object.values(generateProduct()).join(',') + '\r\n', err => err && console.log(err));
      rows--;
    }
    console.log(rows + ' rows remaining.');
    return rows > 0 ? new Promise((resolve, reject) => stream.once('drain', () => resolve(write() ))) : Promise.resolve(true);
  }
  await write();
  console.log('Done writing!');
  return Promise.resolve(true);
};

generateRows(process.env.ROWS_TO_GENERATE) //define the number of rows to generate
  /* Transfer the generated CSV to the docker container */
  .then(async () => {
    console.log('>>> Transferring to Docker, please wait... <<<');
    const { stdout, stderr } = await exec(`docker cp ${__dirname}/mockData.csv postgres:/mockData.csv`);
    if (stdout) console.log('stdout:', stdout);
    if (stderr) throw stderr;
  })
  /* Import the CSV to the database */
  .then(async () => {
    console.log('>>> Importing to Postgres, please wait... <<<');
    const { stdout, stderr } = await exec(`docker exec postgres psql -U postgres bidbuy -c "\\copy items from mockData.csv with (format 'csv');"`);
    if (stdout) console.log('stdout:', stdout);
    if (stderr) throw stderr;
  })
  .then(() => console.timeEnd('Seeder'))
  .then(() => process.exit(0));

module.exports = {
  generateProduct,
};
