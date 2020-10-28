import moment from "moment";
export default [
  {
    id: "1",
    description: "Chewing Gum",
    note: "",
    createdAt: 0,
    amount: 5,
  },
  {
    id: "2",
    description: "Rent",
    note: "",
    createdAt: moment(0).subtract(4, "days").valueOf(),
    amount: 10050,
  },
  {
    id: "3",
    description: "Books",
    note: "",
    createdAt: moment(0).add(4, "days").valueOf(),
    amount: 500,
  },
];
