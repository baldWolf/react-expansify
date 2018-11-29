import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ReactShallowRenderer from "react-test-renderer/shallow";
import Header from "../../components/HeaderPage";

test("should render Header correctly", () => {
  const wrapper = shallow(<Header />);
  expect(toJson(wrapper)).toMatchSnapshot();

  //expect(wrapper.find('h1').length).toBe(1);
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
  // console.log(renderer.getRenderOutput());
});
