import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';
import TopInfo from '../../client/TopInfo';
import placeholderProduct from './placeholderProduct';

configure({ adapter: new Adapter() });

test('has a tbody element', () => {
  const component = shallow(<TopInfo product={placeholderProduct} />);
  expect(component.find('tbody').length).toBe(1);
});
