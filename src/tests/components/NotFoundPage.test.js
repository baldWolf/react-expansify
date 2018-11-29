import React from "react";
import { shallow } from "enzyme";
import NotFoundPage from "../../components/NotFoundPage";

it('should render the not found page', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
});