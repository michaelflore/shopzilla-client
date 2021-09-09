import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../core/NavBar';

test('should render navbar correctly', () => {

    const wrapper = shallow(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();

})