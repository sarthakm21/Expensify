import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenseData";
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

test("should render ExpenseForm component", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm component with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

//Refer to https://www.evernote.com/shard/s713/sh/6401f8e1-a0b0-4a35-b6cd-e0e56658348e/fa94c51e457a519c50a863e39c590343
test("should render error on invalid submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot(); //Comparing before the error is rendered
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}, //For e.preventDefault()
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot(); //Comparing after the error is rendered
});

test("should set state on description change", () => {
  const value = "New Description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(0).simulate("change", {
    target: {
      value, //For e.target.value
    },
  });
  expect(wrapper.state("description")).toBe(value);
});

test("should set state on Note change", () => {
  const value = "New note";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea").simulate("change", {
    target: {
      value, //For e.target.value
    },
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set state on valid amount change", () => {
  const value = "23.42";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(1).simulate("change", {
    target: {
      value, //For e.target.value
    },
  });
  expect(wrapper.state("amount")).toBe(value);
});

test("should not set state on invalid amount change", () => {
  const value = ["23.425", ".2"];
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: {
        value: value[0], //For e.target.value
      },
    });
  expect(wrapper.state("amount")).toBe("");
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: {
        value: value[1], //For e.target.value
      },
    });
  expect(wrapper.state("amount")).toBe("");
});

test('should call onSubmit prop for valid form submission with correct data', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error')).toBe('');
  const {description, note, amount, createdAt} = { ...expenses[1] };
  expect(onSubmitSpy).lastCalledWith({
    description,
    note, 
    amount,
    createdAt
  })
})

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find(SingleDatePicker).prop('onDateChange')(now)
  expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calender focused on focus change', () => {
  const focused = false;
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused })
  expect(wrapper.state('calenderFocused')).toBe(focused);
})


