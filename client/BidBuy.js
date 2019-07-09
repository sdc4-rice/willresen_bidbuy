import React from 'react';
import styled from 'styled-components';
import TopInfo from './TopInfo.js';
import BidInfo from './BidInfo.js';
import MiscInfo from './MiscInfo.js';

const Div = styled.div`
  background: #f7f7f7;
  font-family: sans-serif;
  width: 500px;
`;

const Table = styled.table`
  font-size: 11pt;
  border-spacing: 0;
  width: 500px;
`;

const Heading = styled.h2`
  font-size: 14pt;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #e2e2e2;
  margin: 0;
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
    this.placeBid = this.placeBid.bind(this);
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

  placeBid(bid) {
    fetch(`http://localhost:3001/bid/${this.getId()}`, {
      body: JSON.stringify({bid}),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post'
    })
      .then(response => response.json())
      .then(product => {
        if (!product.error) {
          this.setState({product});
        }
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.fetchItem(this.getId());
  }

  render() {
    const product = this.state.product;

    return product ? (
      <Div>
        <Heading>{product.name}</Heading>
        <Table>
          <TopInfo product={product} />
          <BidInfo product={product} placeBid={this.placeBid} />
          <MiscInfo product={product} />
        </Table>
      </Div>
    ) : (
      <Div>
        Error: Product with id {this.getId()} not found
      </Div>
    );
  }
}

export default BidBuy;
