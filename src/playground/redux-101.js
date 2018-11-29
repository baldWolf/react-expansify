import { createStore } from 'redux';

// const add = ({a, b}, c) => {
//     return a + b + c;
// };

// console.log(add({a:1, b:2}, 1));

// Action generators
// with default value in the parameter
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count = 1} = {}) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = ( (state = { count: 0 }, action) =>{    
    switch(action.type) {
        case 'INCREMENT':
            //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count + action.incrementBy//incrementBy
            };
        case 'DECREMENT':
            //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - action.decrementBy//decrementBy
            }
        case 'SET': {
            return {
                count: action.count
            }
        }
        case 'RESET':
            return {
                count: 0
            }
        default:
        return state;
    }
});

// const store = createStore( (state = { count: 0 }, action) =>{    
//     switch(action.type) {
//         case 'INCREMENT':
//             //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
//             return {
//                 count: state.count + action.incrementBy//incrementBy
//             };
//         case 'DECREMENT':
//             //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
//             return {
//                 count: state.count - action.decrementBy//decrementBy
//             }
//         case 'SET': {
//             return {
//                 count: action.count
//             }
//         }
//         case 'RESET':
//             return {
//                 count: 0
//             }
//         default:
//         return state;
//     }
// });

const store = createStore(countReducer);


const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

//unsubscribe();

store.dispatch(incrementCount({incrementBy: 5}));
store.dispatch(incrementCount());

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// }); 

// this will not work
// store.dispatch({
//     type: 'INCREMENT'
// }); 

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// });

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 10}));

// store.dispatch({
//     type: 'SET',
//     count: 1
// });

// store.dispatch({
//     type: 'RESET',
// })

store.dispatch(setCount({count: -2}));
store.dispatch(resetCount());