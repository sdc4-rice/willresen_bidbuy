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
      product: {price: 0}
    };

    this.fetchItem = this.fetchItem.bind(this);
  }

  componentDidMount() {
    this.fetchItem(103); // TODO: change this
  }

  fetchItem(id) {
    fetch(`http://localhost:3001/items/id/${id}`)
      .then(response => response.json())
      .then(product => this.setState({product}))
      .catch(console.log);
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