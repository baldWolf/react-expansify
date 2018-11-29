import moment from 'moment';

const filtersRecducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
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

export default filtersReducer;