import React from 'react';

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
        <table>
          <tbody>
            <tr>
              <td>Condition</td>
              <td>{product.condition}</td>
            </tr>
            <tr>
              <td></td>
              <td className="sellerNote">"{product.sellerNote}"</td>
            </tr>
            <tr>
              <td>Time Left</td>
              <td>{date.toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Current Bid:</td>
              <td className="currentBid">
                US ${product.price}
                <form>
                  <input type="text"></input>
                  Enter more than ${product.price}
                </form>
              </td>
              <td>
                [ <a href="#">{product.bids} bids</a> ]
                <button>Place Bid</button>
              </td>
            </tr>
            <tr>
              <td>{product.watchers} watchers</td>
              <td>Ships from {product.shippingCountry}</td>
              <td>{product.returnsAllowed ? '30-day returns' : 'No returns'}</td>
            </tr>

          </tbody>
        </table>
      </div>
    );
  }
}

export default BidBuy;