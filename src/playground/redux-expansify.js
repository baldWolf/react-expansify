import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
// REMOVE_EXPENSE
// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// ADD_EXPENSE
const addExpense = (
    {
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0 
    }) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ( {id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
});

// SET_START_DATE
const setStartDate = (start) => ({
    type: 'SET_START_DATE',
    startDate: start
});

// SET_END_DATE
const setEndDate = (end) => ({
    type: 'SET_END_DATE',
    endDate: end
});

const expensesReducerDefaultState = [];

// Expense Reducer

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE': {
            // same effect with state.concat(action.expense)
            return [
                ...state,
                action.expense
            ];
        }
        case 'REMOVE_EXPENSE': {
            return state.filter(expense => expense.id !== action.id);
        }
        case 'EDIT_EXPENSE': {
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            }); 
        }
        default:
            return state;
    }
};

const filtersRecducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

// Filters Reducer

const filtersReducer = (state = filtersRecducerDefaultState, action) => {
    switch(action.type) {
        case 'SORT_BY_AMOUNT':
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SET_TEXT_FILTER': {
            return {
                ...state,
                text: action.text
            };
        }
        case 'SET_START_DATE': {
            return {
                ...state,
                startDate: action.startDate
            };
        }
        case 'SET_END_DATE': {
            return {
                ...state,
                endDate: action.endDate
            }
        }
        default:
            return state;
    }
};

const getVisibleExpenses = ( expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate === 'number' && expense.createdAt >= startDate;
        const endDateMatch = typeof endDate === 'number' && expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase() === text.toLowerCase() || expense.description.includes(text);
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if ( sortBy == 'date') {
            // sort by latest
            return a.createdAt < b.createdAt ? 1 : -1;
        } else {
            // sort by highest
            return a.amount < b.amount ? 1 : -1;
        }
    } 
)};

// store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses( state.expenses, state.filters );
    console.log(visibleExpenses);
});

const rent = store.dispatch(addExpense({
    description: 'rent', 
    amount: 110,
    createdAt: 1000
}));

const rent02 = store.dispatch(addExpense({
    description: 'rent', 
    amount: 220,
    createdAt: 1200
}));

const coffee = store.dispatch(addExpense({
    description: 'coffee', 
    amount: 5,
    createdAt: 1100
}));

// store.dispatch(removeExpense({
//     id: rent.expense.id
// }));

// store.dispatch(editExpense(
//     coffee.expense.id,
//      { amount: 500}
// )); 

store.dispatch(setTextFilter('rent'));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
store.dispatch(setEndDate(1250));

// sample
// const demoState = {
//     expenses: [{
//         id: 'ohjwjfowfoj',
//         description: 'Rent',
//         note: 'Just a note',
//         amount: 54500,
//         createdAt: 0
//     },{
//         id: 'iwejfjwaofj',
//         description: 'Dinner',
//         note: 'Another note',
//         amount: 2000,
//         createdAt: 0
//     }],
//     filters: {
//         text: 'rent',
//         sortBy: 'amount',
//         startDate: undefined,
//         endDate: undefined
//     }
// };

// const user = {
//     name: 'Jen',
//     age: 24
// };

// console.log({
//     ...user,
//     location: 'Earth',
//     age: 29
// });