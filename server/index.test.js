const rp = require('request-promise');

rp('http://localhost:3001/items/id/103')
  .then(res => console.log(res))
  .catch(err => console.log(err));
