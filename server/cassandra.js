const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042']
});

const Items =
  `CREATE TABLE items (
    id int PRIMARY KEY,
    name text,
    url text,
    condition text,
    price decimal,
    sellerNote text,
    expiresAt timestamp,
    watchers int,
    bids int,
    shippingCountry text,
    returnsAllowed boolean
  );
`
const getById = (id) => {
  const query = 'SELECT * FROM items WHERE id = ?';
  return client.execute(query, [id]);
};

const getByName = (name) => {
  const query = 'SELECT * FROM items WHERE url = ?';
  return client.execute(query, [name]);
};

const insertItem = (item) => {
  const query = `INSERT INTO items (
             name, url, condition, price,
             sellerNote, watchers, bids, shippingCountry,
             returnsAllowed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const args = [item.name, item.url, item.condition, item.price, item.sellerNote, item.watchers, item.bids, item.shippingCountry, item.returnsAllowed]
  return client.execute(query, args);
};

const deleteItem = (id) => {
 const query = `DELETE FROM items WHERE id = ?`;
 return client.execute(query, [id]);
}

const updateItem = (id, updated) => {
const querystring = '';

for (let key in updated) {
  querystring += `${key} = ${updated[key]} `
}

 const query = `UPDATE items SET ? WHERE id = ?`;
 client.execute(query, [params, id]);
};

module.exports = {
  getById,
  getByName,
  updateItem,
  insertItem,
  deleteItem,
  client,
  Items
};