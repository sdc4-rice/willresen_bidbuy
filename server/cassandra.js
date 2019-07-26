const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'bidbuy'
});

const Items =
  `CREATE TABLE items (
    name text,
    id uuid,
    url text,
    condition text,
    price decimal,
    sellerNote text,
    expiresAt timestamp,
    createdAt timestamp,
    watchers int,
    bids int,
    shippingCountry text,
    returnsAllowed boolean,
    PRIMARY KEY (name, createdAt, id)
  ) WITH CLUSTERING ORDER BY (createdAt DESC);
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
             id, name, condition, price,
             sellerNote, expiresAt, watchers, bids, shippingCountry,
             returnsAllowed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [item.id, item.name, item.url, item.condition, item.price, item.sellerNote, item.expiresAt, item.watchers, item.bids, item.shippingCountry, item.returnsAllowed]
  return client.execute(query, params);
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