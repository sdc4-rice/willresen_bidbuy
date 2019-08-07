import React from 'react';
import ReactDOM from 'react-dom';
import BidBuy from './BidBuy';

if (typeof window !== 'undefined') {
  ReactDOM.hydrate(<BidBuy />, document.getElementById('bid-buy'));
}
