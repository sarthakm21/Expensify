import moment from "moment";

const getVisibleExpenses = (expenses, { startDate, endDate, text, sortBy }) => {
  return expenses
    .filter((expense) => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatches = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;

      const endDateMatches = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;

      const textMatches = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatches && endDateMatches && textMatches;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return moment(a.createdAt).isAfter(b.createdAt) ? -1 : 1;
      } else {
        return a.amount > b.amount ? -1 : 1;
      }
    });
};

export default getVisibleExpenses;
