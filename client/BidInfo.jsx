import React from 'react';
import styled from 'styled-components';

const Td = styled.td`
  padding: 1em;
`;

const MiddleRow = styled.tr`
  background: #e2e2e2;
  vertical-align: top;
`;

const Span = styled.span`
  font-size: small;
  color: #666;
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

class BidInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: ''
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(e) {
    this.setState({
      bid: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.placeBid(this.state.bid);
    this.setState({
      bid: ''
    });
  }

  render() {
    const product = this.props.product;

    return (
      <tbody>
        <MiddleRow>
          <Td>Current Bid:</Td>
          <Td>
            US ${product.price.toFixed(2)}
            <form onSubmit={this.handleFormSubmit}>
              <input
                type="text"
                name="bid"
                value={this.state.bid}
                onChange={this.handleFormChange}
              ></input> <br />
              <Span>Enter US ${(product.price + 1).toFixed(2)} or more</Span>
            </form>
          </Td>
          <Td>
            [ <a>{product.bids} bids</a> ]
            <BidButton onClick={this.handleFormSubmit}>Place bid</BidButton>
          </Td>
        </MiddleRow>
      </tbody>
    );
  }
}

export default BidInfo;
