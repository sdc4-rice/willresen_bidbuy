/**
 * @jest-environment jsdom
 */

import React from 'react';
import BidBuy from '../../client/BidBuy.js';
import { configure, shallow } from 'enzyme';
import placeholderProduct from './placeholderProduct';
import Adapter from 'enzyme-adapter-react-16';

// This mocks `fetch()`. The mocked function returns a placeholder product
// object.
placeholderProduct.json = () => Promise.resolve(placeholderProduct);
const mockFetch = () => Promise.resolve(placeholderProduct);

configure({ adapter: new Adapter() });

describe('BidBuy component', () => {
  global.fetch = jest.fn(mockFetch);

  test('mounts correctly', () => {
    jest.spyOn(BidBuy.prototype, 'componentDidMount');
    shallow(<BidBuy />);
    expect(BidBuy.prototype.componentDidMount).toHaveBeenCalled();
  });

  test('sets default state', () => {
    const wrapper = shallow(<BidBuy />);
    expect(wrapper.state().product).toBeDefined();
  });
});
