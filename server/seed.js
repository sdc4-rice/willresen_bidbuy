// This file is run with `npm run seed`.
//
// When this file is run, the `handleSeeding` function is executed and the
// database is seeded with products. You can optionally pass in `startId` and
// `endId` integer arguments to `handleSeeding`.
//
// This file exists automatically when the seeding script is done. The exit
// code indicates whether the seeding was successful.

const process = require('process');
const { handleSeeding } = require('./seedHelpers.js');

handleSeeding()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
