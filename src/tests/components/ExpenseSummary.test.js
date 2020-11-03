import React from "react";
import { ExpenseSummary } from "../../components/ExpenseSummary";
import expenses from "../fixtures/expenseData";
import { filters } from "../fixtures/filterData";
import { shallow } from "enzyme";

test("should render expense summary with single expense", () => {
  const wrapper = shallow(
    <ExpenseSummary totalExpenses={1} totalAmount={2031.32} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render expense summary with multiple expenses", () => {
  const wrapper = shallow(
    <ExpenseSummary totalExpenses={4} totalAmount={209031.32} />
  );
  expect(wrapper).toMatchSnapshot();
});
