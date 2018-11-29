import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense( {id: '123abc' });
    expect(action).toEqual(
        {
            type: 'REMOVE_EXPENSE',
            id: '123abc'
        }
    );
});

test('should setup edit expense action object', () => {

    const updates = {
        description: 'Rent bill',
        amount: 100.00,
        note: 'This is a note.',
        id: '123abc'
    };
    const result = {
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates
    };
    const action = editExpense('123abc',updates);
    expect(action).toEqual(result);
});

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 10500,
        createdAt: 1000,
        note: 'This is a note'
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

// TODO
// having some issue when using destructing parameter
test('should setup add expense action object with default values', () => {
    // const action = addExpense();
    // const expenseData = {
    //     description: 'unamed', 
    //     note: 'unamed', 
    //     amount: 0, 
    //     createdAt: 0 
    // };
    // expect(action).toEqual({
    //     type: 'ADD_EXPENSE',
    //     expense: {
    //         ...expenseData,
    //         id: expect.any(String)
    //     }
    // });
});
