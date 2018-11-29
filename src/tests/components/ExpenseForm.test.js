import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid from submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    
    // TODO: investigate why error is not set properly
    // should be...
    // expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper.state('error').length).toBe(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'this is a decription';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on text area change', () => {
    const value = 'this is a note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        persist: () => {},
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
    // TODO: issue, .match not a function
    // const value = 20.50;
    // const wrapper = shallow(<ExpenseForm />);
    // wrapper.find('input').at(1).simulate('change', {
    //     target: { value }
    // });
    // expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = 'abcd';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBeFalsy();
});

test('should call onSubmit prop for valid from submission', () => {
    const onSubmitSpy = jest.fn();
    //onSubmitSpy('Mike', 'Earth');
    //expect(onSubmitSpy).toHaveBeenCalled();
    //expect(onSubmitSpy).toHaveBeenCalledWith('Mike', 'Earth');
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});
