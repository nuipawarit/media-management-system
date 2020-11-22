import React from "react";

import { shallow } from "enzyme";

import Document from "./index";

const defaultProps = {
  children: <div>Text</div>,
};

describe("<Document />", () => {
  it("should render without crashing", () => {
    const props = { ...defaultProps };

    const wrapper = shallow(<Document {...props} />);

    expect(wrapper).toBeDefined();
  });

  it("should render children", () => {
    const props = { ...defaultProps };
    const expected = { children: props.children };

    const wrapper = shallow(<Document {...props} />);

    expect(wrapper).toContain(expected.children);
  });
});
