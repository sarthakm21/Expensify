export default (state = [], action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];

    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);

    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else return expense;
        //Object spread syntax does not work with many browsers so we need to add a babel plugin for this.
      });

    case "SET_EXPENSE":
      return action.expenses;

    default:
      return state;
  }
};
