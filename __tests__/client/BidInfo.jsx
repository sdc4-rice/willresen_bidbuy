import React from 'react';
import renderer from 'react-test-renderer';
import BidInfo from '../../client/BidInfo';
import placeholderProduct from './placeholderProduct';

it('renders correctly', () => {
  const tree = renderer
    .create(<BidInfo product={placeholderProduct} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
