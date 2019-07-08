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
  font-style: italic;
  padding-left: 1em;
`;

const BidButton = styled.button`
  background: #0068af;
  color: #fff
  font-weight: bold;
  display: block;
  border-radius: 5px;
  font-size: 13pt;
  width: 128px;
  padding: 5px 0;
  margin: 1em 0;
  :active {
    position: relative;
    top: 1px;
  }
`;

// #636363

const Table = styled.table`
  font-family: sans-serif;
  background: #f7f7f7;
  border-spacing: 0;
  font-size: 11pt;
  width: 500px;
`;

const Td = styled.td`
  padding: 1em;
`;

const TopRow = styled.tr`
`;

const MiddleRow = styled.tr`
  background: #e2e2e2;
  vertical-align: top;
`;

const BottomRow = styled.tr`
  text-align: center;
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
        <Table>
          <tbody>
            <TopRow>
              <Td>Condition:</Td>
              <Td><strong>{product.condition}</strong></Td>
            </TopRow>
            {product.sellerNote ? (
              <TopRow>
                <Td></Td>
                <SellerNote>"{product.sellerNote}"</SellerNote>
              </TopRow>
            ) : null}
            <TopRow>
              <Td>Time Left:</Td>
              <Td>{date.toLocaleDateString()}</Td>
            </TopRow>
            <MiddleRow>
              <Td>Current Bid:</Td>
              <Td>
                US ${product.price}
                <form>
                  <input type="text"></input> <br />
                  <Span>Enter US ${product.price + 1} or more</Span>
                </form>
              </Td>
              <Td>
                [ <a>{product.bids} bids</a> ]
                <BidButton>Place bid</BidButton>
              </Td>
            </MiddleRow>
            <BottomRow>
              <Td>{product.watchers} watchers</Td>
              <Td>Ships from {product.shippingCountry}</Td>
              <Td>{product.returnsAllowed ? '30-day returns' : 'No returns'}</Td>
            </BottomRow>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default BidBuy;