import React from 'react';

import { shallow } from 'enzyme';

import App from './index';

describe('<App />', () => {
  const component = <App />;

  it('should render without crashing', () => {
    const wrapper = shallow(component);

    expect(wrapper).toBeDefined();
  });
});
