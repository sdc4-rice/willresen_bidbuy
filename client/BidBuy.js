import React from 'react';
import styled from 'styled-components';
import TopInfo from './TopInfo.js';
import BidInfo from './BidInfo.js';
import MiscInfo from './MiscInfo.js';

const Code = styled.div`
  font-family: monospace;
  margin: 1em;
  padding: 1em;
`;

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

    this.parseUrl = this.parseUrl.bind(this);
    this.getId = this.getId.bind(this);
    this.getName = this.getName.bind(this);
    this.fetchItemById = this.fetchItemById.bind(this);
    this.fetchItemByName = this.fetchItemByName.bind(this);
    this.placeBid = this.placeBid.bind(this);
  }

  // Returns an array consisting of the key value pair after the '?' in the URL.
  // For example, if the URL is http://localhost:3001/?id=103, `parseUrl()` returns
  // ['id', '103'],
  parseUrl() {
    const params = window.location.href.split('?')[1];
    return params.split('=');
  }

  // The id of the current item is the value of the 'id' parameter in the URL.
  // For example, for the URL 'http://localhost:3001/?id=103', the id of the
  // current item is '103'.
  getId() {
    const [key, value] = this.parseUrl();
    return key === 'id' ? value : null;
  }

  // The name of the current item is the value of the 'name' parameter in the
  // URL. For example, for the URL 'http://localhost:3001/?name=fantastic-concrete-fish',
  // the name of the current item is 'fantastic-concrete-fish'.
  getName() {
    const [key, value] = this.parseUrl();
    return key === 'name' ? value : null;
  }

  fetchItemById(id) {
    fetch(`http://localhost:3001/items/id/${id}`)
      .then(response => response.json())
      .then(product => this.setState({product}))
      .catch(console.log);
  }

  fetchItemByName(name) {
    fetch(`http://localhost:3001/items/name/${name}`)
      .then(response => response.json())
      .then(product => this.setState({product}))
      .catch(console.log);
  }

  fetchItem() {
    const id = this.getId();
    const name = this.getName();

    if (id) {
      this.fetchItemById(id);
    } else {
      this.fetchItemByName(name);
    }
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
    this.fetchItem();
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
        Product not found
        <Code>
          id: {this.getId()} <br />
          name: {this.getName()}
        </Code>
      </Div>
    );
  }
}

export default BidBuy;
