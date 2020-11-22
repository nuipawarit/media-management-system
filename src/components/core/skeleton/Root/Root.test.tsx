import React from "react";

import { shallow } from "enzyme";

import { mockStore } from "tests/mock";

import Root from "./index";

describe("<Root />", () => {
  it("should connect to the Redux store and render without crashing", () => {
    const wrapper = shallow(<Root store={mockStore({})} />);

    expect(wrapper).toBeDefined();
  });
});
