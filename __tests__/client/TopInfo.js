import React from 'react';
import TopInfo from '../../client/TopInfo.js';
import renderer from 'react-test-renderer';

const placeholderProduct = {
  id: 109,
  name: 'Fantastic Concrete Fish',
  'url-name': 'fantastic-concrete-fish',
  condition: 'New',
  price: 564,
  sellerNote: 'Numquam eius laborum.',
  expiresAt: '2019-07-28T18:05:33.973Z',
  watchers: 26,
  bids: 37,
  shippingCountry: 'Eritrea',
  returnsAllowed: true,
};

it('renders correctly', () => {
  const tree = renderer
    .create(<TopInfo product={placeholderProduct} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
