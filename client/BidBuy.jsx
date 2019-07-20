import React from 'react';
import styled from 'styled-components';
import TopInfo from './TopInfo';
import BidInfo from './BidInfo';
import MiscInfo from './MiscInfo';

// Change this to 'http://localhost:<PORT>' if you are running the module on a
// local machine. The following URL is to the deployed module on EC2.
// You can also change it to an empty string. This will break the proxy, but
// the module will work if it is loaded by itself.
const hostURL = 'http://18.213.115.247';

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

// Returns an array consisting of the key value pair after the '?' in the URL.
// For example, if the URL is ${hostURL}/?id=103, `parseUrl()` returns
// ['id', '103'],
const parseUrl = () => {
  const params = window.location.href.split('?')[1] || ''; // the default prevents an error when there's no '?'
  return params.split('=');
};

// The id of the current item is the value of the 'id' parameter in the URL.
// For example, for the URL '${hostURL}/?id=103', the id of the
// current item is '103'.
const getId = () => {
  const [key, value] = parseUrl();
  return key === 'id' ? value : null;
};

// The name of the current item is the value of the 'name' parameter in the
// URL. For example, for the URL '${hostURL}/?name=fantastic-concrete-fish',
// the name of the current item is 'fantastic-concrete-fish'.
const getName = () => {
  const [key, value] = parseUrl();
  return key === 'name' ? value : null;
};

class BidBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: { price: 0 },
    };

    this.fetchItemById = this.fetchItemById.bind(this);
    this.fetchItemByName = this.fetchItemByName.bind(this);
    this.placeBid = this.placeBid.bind(this);
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItemById(id) {
    fetch(`${hostURL}/items/id/${id}`)
      .then(response => response.json())
      .then(product => this.setState({ product }))
      .catch(console.log);
  }

  fetchItemByName(name) {
    fetch(`${hostURL}/items/name/${name}`)
      .then(response => response.json())
      .then(product => this.setState({ product }))
      .catch(console.log);
  }

  fetchItem() {
    const id = getId();
    const name = getName();

    if (id) {
      this.fetchItemById(id);
    } else {
      this.fetchItemByName(name);
    }
  }

  placeBid(bid) {
    const { product } = this.state;

    fetch(`${hostURL}/bid/${product.id}`, {
      body: JSON.stringify({ bid }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
    })
      .then(response => response.json())
      .then((newProduct) => {
        if (newProduct.error) {
          throw newProduct.message;
        }
        this.setState({ product: newProduct });
      })
      .catch(console.log);
  }


  render() {
    const { product } = this.state;

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
          {`id: ${getId() + ''}`}
          <br />
          {`name: ${getName() + ''}`}
        </Code>
      </Div>
    );
  }
}

export default BidBuy;
