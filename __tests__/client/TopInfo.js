import React from 'react';
import TopInfo from '../../client/TopInfo.js';
import renderer from 'react-test-renderer';
import placeholderProduct from './placeholderProduct.js';

it('renders correctly', () => {
  const tree = renderer
    .create(<TopInfo product={placeholderProduct} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
