import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import { editExpense } from '../../actions/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, {
        type: '@@INIT'
    });

    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test('should add an expense', () => {
    const newExpense = {
        id: '4',
        description: 'New Expense',
        amount: 100,
        createdAt: 1000,
        note: 'This is a note'
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense,
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense', () => {
    const editedExpense = {
        id: '3',
        description: 'Edit Expense',
        amount: 100,
        createdAt: 1000,
        note: 'This is a note'
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: '3',
        updates: editedExpense
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([
        expenses[0],
        expenses[1],
        editedExpense
    ]);
});

test('should not edit expense if expense not found', () => {
    const editedExpense = {
        id: '4',
        description: 'newExpense',
        amount: 100,
        createdAt: 1000,
        note: 'This is a note'
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: editExpense.id,
        updates: editedExpense
    };

    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
});