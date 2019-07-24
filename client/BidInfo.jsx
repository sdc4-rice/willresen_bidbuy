import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Td = styled.td`
  padding: 1em;
`;

const MiddleRow = styled.tr`
  background: #e2e2e2;
  vertical-align: top;
  border: 3px solid #e2e2e2;
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

const BidInput = styled.input`
  font-size: 14pt;
  width: 150px;
  display: inline-block;
  margin-bottom: 0.2em;
`;

const CurrentBid = styled.span`
  font-weight: bold;
  font-size: 13pt;
  margin-bottom: 0.5em;
  display: inline-block;
`;

class BidInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: '',
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(e) {
    this.setState({
      bid: e.target.value,
    });
  }

  handleFormSubmit(e) {
    const { placeBid } = this.props;
    const { bid } = this.state;

    e.preventDefault();
    placeBid(bid);
    this.setState({
      bid: '',
    });
  }

  render() {
    const { product } = this.props;
    const { bid } = this.state;

    return (
      <tbody>
        <MiddleRow>
          <Td>Current Bid:</Td>
          <Td>
            <CurrentBid>
              US ${parseFloat(product.price).toFixed(2)}
            </CurrentBid>
            <form onSubmit={this.handleFormSubmit}>
              <BidInput
                type="text"
                name="bid"
                value={bid}
                onChange={this.handleFormChange}
              />
              <br />
              <Span>
                {`Enter US $${(parseFloat(product.price) + 1).toFixed(2)} or more`}
              </Span>
            </form>
          </Td>
          <Td>
            {`[ ${product.bids} bids ]`}
            <BidButton onClick={this.handleFormSubmit}>Place bid</BidButton>
          </Td>
        </MiddleRow>
      </tbody>
    );
  }
}

BidInfo.propTypes = {
  product: PropTypes.object.isRequired,
  placeBid: PropTypes.func.isRequired,
};

export default BidInfo;
