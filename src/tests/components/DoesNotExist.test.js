import React from "react";
import DoesNotExist from "../../components/DoesNotExist";
import { shallow } from "enzyme";

test("should render doesNotExist component", () => {
  const wrapper = shallow(<DoesNotExist />);
  expect(wrapper).toMatchSnapshot();
});
