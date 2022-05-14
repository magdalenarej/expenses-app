import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {expensesActions} from "../store/store";

const randomID = () => {
    return Math.floor(Math.random() * 10000);
};
const date = new Date().toISOString().split("T")[0];
const initialExpense = {expenseName: "", expenseValue: '', expenseDate: date, expenseType: 'groceries', key: 1};

const Expenses = () => {
    const [expense, setExpense] = useState(initialExpense);
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expenses);

    const renderExpenses = () => {
        return expenses.map(ex => {
            return (
                <div key={ex.key}>
                    <span>{ex.expenseName}</span> {' | '}
                    <span>{ex.expenseValue}</span>{' | '}
                    <span>{ex.expenseDate}</span>{' | '}
                    <span>{ex.expenseType}</span>
                </div>
            );
        });
    };

    const expensesSummary = expenses.reduce((acc, curr) => {
        return acc + Number(curr.expenseValue);
    }, 0);

    const addExpense = (event) => {
        event.preventDefault();
        dispatch(expensesActions.addExpense(expense));
        setExpense(initialExpense);
    };


    return (
        <div className="expenses">
            <form className="add-expense-form">
                <input
                    type="text"
                    className="add-expense-input-text"
                    value={expense.expenseName}
                    onChange={e => {
                        setExpense({...expense, expenseName: e.target.value, key: randomID()});
                    }}
                />
                <input
                    type="number"
                    className="add-expense-input-value"
                    value={expense.expenseValue}
                    onChange={(e) => setExpense({...expense, expenseValue: e.target.value})}
                />
                <input
                    type="date"
                    className="add-expense-input-date"
                    value={expense.expenseDate}
                    onChange={(e) => setExpense({...expense, expenseDate: e.target.value})}
                />
                <select
                    className="add-expense-select-types"
                    value={expense.expenseType}
                    onChange={e => setExpense({...expense, expenseType: e.target.value})}
                >
                    <option value="groceries">groceries</option>
                    <option value="bills">bills</option>
                    <option value="education">education</option>
                    <option value="clothes">clothes</option>
                    <option value="health">health</option>
                    <option value="entertainment">entertainment</option>
                    <option value="other">other</option>
                </select>
                <button
                    type="submit"
                    className="add-expense-btn"
                    onClick={e => addExpense(e)}
                >
                    Add expense
                </button>
            </form>
            <h3>Your expenses: {expensesSummary}</h3>
            <div className="expenses-items">
                {renderExpenses()}
            </div>
        </div>
    );
};


export default Expenses;
