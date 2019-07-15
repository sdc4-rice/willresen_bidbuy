# bid-buy

The bid-buy component of an eBay auction page.

## Related Projects

  - https://github.com/fec4-gandolf/images-modal
  - https://github.com/fec4-gandolf/Napoleon-Service
  - https://github.com/fec4-gandolf/PeopleAlsoViewed

## Table of Contents

1. [Setup](#setup)
1. [Usage](#usage-local)
1. [Requirements](#requirements)
1. [Development](#development)

## Setup

1. Install npm packages: `npm install`
2. Create an `.env` file in the root directory. This should specify values for `PORT`, `DB_NAME`, `START_ID`, and `END_ID`. I suggest the following:
  ```
  PORT=3001
  DB_NAME=products-bid-buy
  START_ID=100
  END_ID=200
  ```
3. Make sure you have MonogoDB installed and running.
4. Seed: `npm run seed`
5. Build: `npm run build`
6. Start the server: `npm run start`

## Usage (local)

After the setup is complete, you can view a specific product at `http://localhost:<PORT>/?id=<ID>` or `http://localhost:<PORT>?name=<NAME>`.

For example, if your server is running on port `3001`, you can view the product with id `103` at the following URL: `http://localhost:3001/?id=103`.

If you fail to specify the id or name of a product, you will see a "Product not found" message.

The bundle is located at `http://localhost:<PORT>/bundle.js`. It will automatically mount the React component to an element with id the `bid-buy`.

## Requirements

MongoDB
