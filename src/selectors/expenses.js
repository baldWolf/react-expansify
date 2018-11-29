import moment from 'moment';


export default ( expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        // const createdAtMoment = moment(expense.createdAt);
        // const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;//(typeof startDate === 'number' && expense.createdAt >= startDate) 
        //     //|| startDate === undefined;
        // const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;//(typeof endDate === 'number' && expense.createdAt <= endDate) 
        //     //|| endDate === undefined;
        // const textMatch = expense.description.toLowerCase() === text.toLowerCase() 
        //     || expense.description.includes(text);

        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        // if ( sortBy == 'date') {
        //     // sort by latest
        //     return a.createdAt < b.createdAt ? 1 : -1;
        // } else {
        //     // sort by highest
        //     return a.amount < b.amount ? 1 : -1;
        // }
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    } 
)};

//export default getVisibleExpenses;