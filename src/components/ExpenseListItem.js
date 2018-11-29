import React from 'react'
//import { connect } from 'react-redux';
//import { removeExpense } from './../actions/expenses';
//import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

// const ExpenseListItem = ( { description, amount, createdAt }) => {
//     return (
//         <div>
//             <h3>{description}</h3> 
//             <p>{amount} - {createdAt}</p>
//         </div>
//     );
// };

// export default ExpenseListItem;


// const ExpenseListItem = ( props ) => {    
//     return (
//         <div>
//             <h3>{props.item.description}</h3> 
//             <p>{props.item.amount} - {props.item.createdAt}</p>
//             <button onClick={() => {
//                 props.state.dispatch(
//                     removeExpense({id: props.item.id})
//                 )}}>
//                 Remove
//             </button>
//         </div>
//     );
// };

// export default (ExpenseListItem);

// const ExpenseListItem = ( { dispatch, id, description, amount, createdAt }) => {
//     //const editExpense = `/edit/${id}`;
//     return (
//         <div>
//             <Link to={`/edit/${id}`}>
//                 <h3>{description}</h3>
//             </Link>
//             <p>{amount} - {createdAt}</p>
//             <button onClick={() => {
//                 dispatch(removeExpense({id: id}));
//             }}>Remove</button>
//         </div>
//     );
// };

// sample only
//<NavLink to={editExpense} activeClassName="is-active"><h3>{description}</h3></NavLink>

//export default connect()(ExpenseListItem);

const ExpenseListItem = ( { id, description, amount, createdAt }) => {
    //const editExpense = `/edit/${id}`;
    return (
        <div>
            <Link to={`/edit/${id}`}>
                <h3>{description}</h3>
            </Link>
            <p>{amount} - {createdAt}</p>
        </div>
    );
};

export default ExpenseListItem;