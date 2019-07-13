/**
 * @jest-environment jsdom
 */

import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import React from 'react';
import BidBuy from '../../client/BidBuy';
import placeholderProduct from './placeholderProduct';

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
