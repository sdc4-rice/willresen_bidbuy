import React from 'react';
import BidInfo from '../../client/BidInfo.js';
import renderer from 'react-test-renderer';
import placeholderProduct from './placeholderProduct.js';

it('renders correctly', () => {
  const tree = renderer
    .create(<BidInfo product={placeholderProduct} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
