import React from 'react';
import styled from 'styled-components';

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

const SellerNote = styled.td`
  font-style: italic
`;

const BidButton = styled.button`
  background: #0068af;
  color: #fff
  font-weight: bold;
  display: block;
  border-radius: 5px;
  font-size: 13pt;
  width: 128px;
  padding: 5px 0 5px 0;
  :active {
    position: relative;
    top: 1px;
  }
`;

const Table = styled.table`
  font-family: sans-serif;
  border-spacing: 0;
`;

const TopRow = styled.tr`

`;

const MiddleRow = styled.tr`
  background: #e2e2e2;
  vertical-align: top;
`;

const BottomRow = styled.tr`
  text-align: center
`;

const Span = styled.span`
  font-size: small;
  color: #666;
`;

class BidBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = placeholder;
  }

  render() {
    const product = this.state;
    const date = new Date(product.expiresAt);

    return (
      <div>
        <h2>Bid-Buy Placeholder</h2>
        <h3>{product.name}</h3>
        <Table>
          <tbody>
            <tr>
              <td>Condition</td>
              <td><strong>{product.condition}</strong></td>
            </tr>
            <tr>
              <td></td>
              <SellerNote>"{product.sellerNote}"</SellerNote>
            </tr>
            <tr>
              <td>Time Left</td>
              <td>{date.toLocaleDateString()}</td>
            </tr>
            <MiddleRow>
              <td>Current Bid:</td>
              <td className="currentBid">
                US ${product.price}
                <form>
                  <input type="text"></input> <br />
                  <Span>Enter more than ${product.price}</Span>
                </form>
              </td>
              <td>
                [ <a href="#">{product.bids} bids</a> ]
                <BidButton>Place bid</BidButton>
              </td>
            </MiddleRow>
            <BottomRow>
              <td>{product.watchers} watchers</td>
              <td>Ships from {product.shippingCountry}</td>
              <td>{product.returnsAllowed ? '30-day returns' : 'No returns'}</td>
            </BottomRow>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default BidBuy;