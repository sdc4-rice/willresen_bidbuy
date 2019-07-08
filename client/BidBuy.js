import React from 'react';
import styled from 'styled-components';
import TopInfo from './TopInfo.js';
import BidInfo from './BidInfo.js';
import MiscInfo from './MiscInfo.js';

const placeholder = {
  "_id": "5d23357882b9176777ec76b5",
  "id": 109,
  "name": "Fantastic Concrete Fish",
  "url-name": "fantastic-concrete-fish",
  "condition": "New",
  "price": 564,
  "sellerNote": "Numquam eius laborum.",
  "expiresAt": "2019-07-28T18:05:33.973Z",
  "watchers": 26,
  "bids": 37,
  "shippingCountry": "Eritrea",
  "returnsAllowed": true,
  "__v": 0
};

const Table = styled.table`
  background: #f7f7f7;
  border-spacing: 0;
  font-family: sans-serif;
  font-size: 11pt;
  width: 500px;
`;

class BidBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = placeholder;
  }

  render() {
    const product = this.state;

    return (
      <div>
        <Table>
          <TopInfo product={product} />
          <BidInfo product={product} />
          <MiscInfo product={product} />
        </Table>
      </div>
    );
  }
}

export default BidBuy;