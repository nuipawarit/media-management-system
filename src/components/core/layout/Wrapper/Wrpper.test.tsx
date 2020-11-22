import React from "react";

import { shallow } from "enzyme";

import Wrapper from "./index";

const defaultProps = {
  children: <div>Text</div>,
};

describe("<Wrapper />", () => {
  it("should render without crashing", () => {
    const props = { ...defaultProps };

    const wrapper = shallow(<Wrapper {...props} />);

    expect(wrapper).toBeDefined();
  });

  it("should render children", () => {
    const props = { ...defaultProps };
    const expected = { children: props.children };

    const wrapper = shallow(<Wrapper {...props} />);
    const element = wrapper.find({ "data-testid": "division" });

    expect(element).toContain(expected.children);
  });
});
