import React from 'react';
import styled from 'styled-components';
import TopInfo from './TopInfo.js';
import BidInfo from './BidInfo.js';
import MiscInfo from './MiscInfo.js';

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
    this.state = {
      product: {price: 0},
      productId: 0
    };

    this.getId = this.getId.bind(this);
    this.fetchItem = this.fetchItem.bind(this);
  }

  // The id of the current item is the number after '?' in the URL. For example,
  // for the URL 'http://localhost:3001/?103', the id of the current item is 103.
  getId() {
    return window.location.href.split('?')[1];
  }

  fetchItem(id) {
    fetch(`http://localhost:3001/items/id/${id}`)
      .then(response => response.json())
      .then(product => this.setState({product}))
      .catch(console.log);
  }

  componentDidMount() {
    this.fetchItem(this.getId());
  }

  render() {
    const product = this.state.product;

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
