import React from 'react';

import { shallow } from 'enzyme';

import Body from './index';

const defaultProps = {
  children: <div>Text</div>,
};

describe('<Body />', () => {
  it('should render without crashing', () => {
    const props = { ...defaultProps };

    const wrapper = shallow(<Body {...props} />);

    expect(wrapper).toBeDefined();
  });

  it('should render children', () => {
    const props = { ...defaultProps };
    const expected = { children: props.children };

    const wrapper = shallow(<Body {...props} />);

    expect(wrapper).toContain(expected.children);
  });
});
