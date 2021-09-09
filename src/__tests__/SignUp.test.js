import React from 'react';
import { shallow } from "enzyme";
import SignUp from '../auth/SignUp';

test('should give error on invalid form', () => {
    const wrapper = shallow(<SignUp />)

    // wrapper.find('button').simulate('click', {
    //     preventDefault: () => {}
    // })

    const value = ''
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })

    expect(wrapper.state('values')['name']).toBe("");
    expect(wrapper).toMatchSnapshot();
})