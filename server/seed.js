// This file is run with `npm run seed`.
//
// When this file is run, the `handleSeeding` function is executed and the
// database is seeded with products.
//
// This file exits automatically when the seeding script is done. The exit
// code indicates whether the seeding was successful.

// const { handleSeeding } = require('./seedHelpers.js');
const { handleSeeding } = require('./cassandra_seedHelpers.js');

handleSeeding()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
