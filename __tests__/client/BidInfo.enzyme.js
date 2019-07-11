import React from 'react';
import TopInfo from '../../client/TopInfo';
import { shallow, configure } from 'enzyme';
import placeholderProduct from './placeholderProduct';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('has a tbody element', () => {
  const component = shallow(<TopInfo product={placeholderProduct} />);
  expect(component.find('tbody').length).toBe(1);
});
