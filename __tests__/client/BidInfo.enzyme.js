import React from 'react';
import TopInfo from '../../client/TopInfo.js';
import { shallow, configure, render } from 'enzyme';
import placeholderProduct from './placeholderProduct';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

xtest('has a bid button', () => { // currently not working
  const component = render(<TopInfo product={placeholderProduct} />);
  console.log(component);
  expect(component.find('form').length).toBe(1);
});