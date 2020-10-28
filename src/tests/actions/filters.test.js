import {
  setFilterText,
  setStartDate,
  setEndDate,
  sortByAmount,
  sortByDate,
} from "../../actions/filters";
import moment from "moment";

test("should setup set start date action generator", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0),
  });
});

test("should setup set end date action generator", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0),
  });
});

test("should setup set filter text action generator with provided values", () => {
  const text = "demo";
  const action = setFilterText(text);
  expect(action).toEqual({
    type: "SET_FILTER_TEXT",
    text,
  });
});

test("should setup set filter text action generator with default values", () => {
  const action = setFilterText("");
  expect(action).toEqual({
    type: "SET_FILTER_TEXT",
    text: "",
  });
});

test("should setup sort by amount action generator", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SORT_BY_AMOUNT",
  });
});

test("should setup sort by date action generator", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SORT_BY_DATE",
  });
});
