import React from 'react';

import { shallow } from 'enzyme';

import Head from './index';

jest.mock('react-helmet');

const defaultProps = {
  children: <title>Page title</title>,
};

describe('<Head />', () => {
  it('should render without crashing', () => {
    const props = { ...defaultProps };

    const wrapper = shallow(<Head {...props} />);

    expect(wrapper).toBeDefined();
  });
});
