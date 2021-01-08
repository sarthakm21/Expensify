import { login, logout } from "../../actions/auth";

test("expect login action generator to return correct data", () => {
  const uid = 167;
  const action = login(uid);
  expect(action).toEqual({
    type: "LOGIN",
    uid,
  });
});

test("expect logout action generator to return correct data", () => {
  const action = logout();
  expect(action).toEqual({
    type: "LOGOUT",
  });
});
