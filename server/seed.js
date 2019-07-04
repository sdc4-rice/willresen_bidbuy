// This file is run with `npm run seed`.
//
// When thils file is run, the `handleSeeding` function is executed and the
// database is seeded with products. You can optionally pass in `startId` and
// `endId` integer arguments to `handleSeeding`.

const {handleSeeding} = require('./seedHelpers.js');

handleSeeding();