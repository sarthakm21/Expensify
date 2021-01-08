import authReducer from "../../reducers/auth";

test("should setup default store values", () => {
  const action = { type: "@@INIT" };
  const state = authReducer(undefined, action);
  expect(state).toEqual({});
});

test("sending login action sets uid", () => {
  const action = {
    type: "LOGIN",
    uid: 10,
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});

test("sending logout action clears uid", () => {
  const action = {
    type: "LOGIN",
  };
  const state = authReducer({ uid: "This is my user id" }, action);
  expect(state).toEqual({});
});
