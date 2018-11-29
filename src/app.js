// default imports
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addExpense, editExpense } from  './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(setTextFilter('coffee'));

// setTimeout(() => {
//     store.dispatch(setTextFilter('water'))
// }, 3000);

store.dispatch(addExpense({
    description: 'coffee',
    createdAt: 100,
    amount: 4500
}));

const csoffee = store.dispatch(addExpense({
    description: 'coffee',
    createdAt: 101,
    amount: 500
}));

const rent = store.dispatch(addExpense({
    description: 'rent',
    createdAt: 1000,
    amount: 1900
}));


// store.dispatch(editExpense(
//     rent.expense.id,
//     {
//         amount: 21
//     }
// ));

const state = store.getState();
console.log(state.filters);
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render( jsx, document.getElementById('app'));