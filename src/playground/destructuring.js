// const person = {
//     name: '',
//     age: 24,
//     location: {
//         city: 'Earth',
//         temp: 92
//     }
// };
// const {name = 'anonymous', age} = person;
// console.log(`${name} is ${age}`);

// const book = {
//     title: '',
//     author: 'unknown',
//     publisher: {
//         name: 'unknown'
//     }
// }
// const {name = 'deil'} = book.publisher;
// console.log(name);

const address = [
    'Earth',
    'Mars',
    'Pluto'
];

//console.log(address[2]);
const [  , , third ] = address;
console.log(third);

const item = [
    'Coffee (hot)',
    '$2.08',
    '$3.04',
    '$5.05'];

const [ type, , midPrice ] = item;
console.log(`A ${type} is ${midPrice}`);
