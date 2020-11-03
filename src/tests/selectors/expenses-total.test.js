import expensesTotal from '../../selectors/expenses-total';
import moment from "moment";

const expenses = [{
    id: '1',
    amount: 1000,
    description: 'Movies and eating out',
    note: '',
    createdAt: moment(0)
}, {
    id: '2',
    amount: 450,
    description: 'Book',
    note: '',
    createdAt: moment(0)
}, {
    id: '3',
    amount: 700,
    description: 'Hackathon registration',
    note: 'I wont win',
    createdAt: moment(0)
}] 

test('should return correct total value with multiple expenses', () => {
    const total = expensesTotal(expenses);
    expect(total).toBe(2150);
})

test('should return correct total value with single expenses', () => {
    const total = expensesTotal([expenses[0]]);
    expect(total).toBe(1000);
})

test('should return correct total value with no expenses', () => {
    const total = expensesTotal([]);
    expect(total).toBe(0);
})