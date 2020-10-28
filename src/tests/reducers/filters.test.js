import moment from "moment";
import filterReducer from "../../reducers/filters";

//@@INIT is redux's default action it passes to populate the store with default values at the initial state.
test("should setup default store values", () => {
  const action = { type: "@@INIT" };
  const state = filterReducer(undefined, action);
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should set sortBy to amount", () => {
  const action = { type: "SORT_BY_AMOUNT" };
  const state = filterReducer(undefined, action);
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const action = { type: "SORT_BY_DATE" };
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  };
  const state = filterReducer(currentState, action);
  expect(state.sortBy).toBe("date");
});

test("should set filter text", () => {
  const text = "Check";
  const action = { type: "SET_FILTER_TEXT", text };
  const state = filterReducer(undefined, action);
  expect(state.text).toBe(text);
});

test("should set start date", () => {
  const startDate = moment(0);
  const action = { type: "SET_START_DATE", startDate };
  const state = filterReducer(undefined, action);
  expect(state.startDate).toStrictEqual(startDate);
});

test("should set end date", () => {
  const endDate = moment(0);
  const action = { type: "SET_END_DATE", endDate };
  const state = filterReducer(undefined, action);
  expect(state.endDate).toStrictEqual(endDate);
});
