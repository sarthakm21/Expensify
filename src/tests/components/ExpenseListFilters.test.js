import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filterData";
import { DateRangePicker } from "react-dates";
import moment from "moment";

let sortByDate, sortByAmount, setFilterText, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setFilterText = jest.fn();
  setEndDate = jest.fn();
  setStartDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setFilterText={setFilterText}
      setEndDate={setEndDate}
      setStartDate={setStartDate}
    />
  );
});

test("should render expense list filters", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render expense list filters with alt filter data", () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const text = "Test text";
  wrapper.find("input").simulate("change", {
    target: {
      value: text,
    },
  });
  expect(setFilterText).lastCalledWith(text);
});

test("should handle sort by date", () => {
  wrapper.setProps({ filters: altFilters });
  const text = "date";
  wrapper.find("select").simulate("change", {
    target: {
      value: text,
    },
  });
  expect(sortByDate).toBeCalled();
});

test("should handle sort by amount", () => {
  const text = "amount";
  wrapper.find("select").simulate("change", {
    target: {
      value: text,
    },
  });
  expect(sortByAmount).toBeCalled();
});

test("should handle date change", () => {
  const newDates = {
    startDate: moment(0),
    endDate: moment(0).add(10, "days"),
  };
  wrapper.find(DateRangePicker).prop("onDatesChange")(newDates);
  expect(setStartDate).lastCalledWith(newDates.startDate);
  expect(setEndDate).lastCalledWith(newDates.endDate);
});

test("should handle calender focus changed", () => {
  const calenderFocused = "endDate";
  wrapper.find(DateRangePicker).prop("onFocusChange")(calenderFocused);
  expect(wrapper.state("calenderFocused")).toBe(calenderFocused);
});
