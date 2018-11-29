import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => {
    return (
        <div>
            {
                props.expenses.length === 0 ? (
                    <p>No Expenses</p>
                ) : (
                    props.expenses.map((expense,index) => (
                        <ExpenseListItem 
                            key={expense.id}
                            {...expense}
                        />
                    ))
                )
            }       
        </div>
    );
};

// const ConnectedExpenseList = connect((state) => {
//     return {
//         expenses: state.expenses
//     };
// })(ExpenseList);
// export default ConnectedExpenseList;

// export default connect((state) => {
//     return {
//         expenses: state.expenses
//     };
// })(ExpenseList);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
    };
};

export default connect (mapStateToProps)(ExpenseList);