import React from "react";
import { shallow } from "enzyme";
import DashboardPage from "../../components/DashboardPage";


it('should render the not found page', () => {
    const wrapper = shallow(<DashboardPage />);
    expect(wrapper).toMatchSnapshot();
});