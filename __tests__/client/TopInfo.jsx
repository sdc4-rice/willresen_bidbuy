import React from 'react';
import renderer from 'react-test-renderer';
import TopInfo from '../../client/TopInfo';
import placeholderProduct from './placeholderProduct';

it('renders correctly', () => {
  const tree = renderer
    .create(<TopInfo product={placeholderProduct} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
