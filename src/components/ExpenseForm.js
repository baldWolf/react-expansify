import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// represent the current point in time
//const now = moment();
//console.log(now.format());

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : undefined,
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? props.expense.amount : undefined,
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: '',
            isEdit: props.expense ? true : false
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => (
            {
                description
            }
        )); 
    };
    onNoteChange = (e) => {
        //const note = e.target.value;
        e.persist();
        this.setState(() => (
            {
                note: e.target.value
            }
        ));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => (
                {
                    amount
                }
            ));
        }
    };
    onDateChange = (createdAt) => {
        this.setState(() => (
            {
                createdAt
            }
        ));
    };
    onFocusChange = ({focused}) => {
        this.setState(() => (
            {
                calendarFocused: focused
            }
        ));
    };
    onSubmit = (e) => {
        e.preventDefault();
        var message = '';
        if (!this.state.description || !this.state.amount) {
            // set error state
            message = 'Please provide description and amount.';
        } else {
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10), //* 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }

        this.setState(() => (
            {
                error: message
            }
        ));
    };
    render() {
        return (
            <div>
                <form>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="text"
                        placeholder="Description" 
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="Amount" 
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        id="date_picker"
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button onClick={this.onSubmit}>{this.state.isEdit ? 'Edit' : 'Add Expense'}</button>
                </form>
            </div>
        );
    }
}

