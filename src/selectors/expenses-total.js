export default (expenses) => {
  const total = expenses.length
    ? expenses
        .map((expense) => expense.amount)
        .reduce((acc, cur) => {
          return acc + cur;
        })
    : 0;

  return total;
};
