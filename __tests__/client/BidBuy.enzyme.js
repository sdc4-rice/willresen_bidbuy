/**
 * @jest-environment jsdom
 */

import React from 'react';
import BidBuy from '../../client/BidBuy.js';
import { configure, mount, shallow } from 'enzyme';
import placeholderProduct from './placeholderProduct';
import Adapter from 'enzyme-adapter-react-16';

// This mocks `fetch()`. The mocked function returns a placeholder product
// object.
placeholderProduct.json = () => Promise.resolve(placeholderProduct);
const mockFetch = () => Promise.resolve(placeholderProduct);

configure({ adapter: new Adapter() });

test('mounts correctly', () => {
  global.fetch = jest.fn(mockFetch);
  jest.spyOn(BidBuy.prototype, 'componentDidMount');
  mount(<BidBuy />);
  expect(BidBuy.prototype.componentDidMount).toHaveBeenCalled();
});