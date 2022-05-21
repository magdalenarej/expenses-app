import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {expensesActions} from "../store/store";
import Input from "./UI/Input/Input";
import Select from "./UI/Select/Select";
import Button from "./UI/Button/Button";
import ListElement from "./UI/ListeElement/ListElement";
import Header from "./UI/Header/Header";
import {isSameMonth} from "date-fns";

const randomID = () => {
    return Math.floor(Math.random() * 10000);
};
const date = new Date().toISOString().split("T")[0];
const initialExpense = {expenseName: "", expenseValue: '', expenseDate: date, expenseType: 'groceries', key: 1};
const expensesTypes = ["groceries", "bills", "education", "clothes", "health", "entertainment", "other"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const getMonth = new Date().getMonth();


const Expenses = () => {
    const [expense, setExpense] = useState(initialExpense);
    const [month, setMonth] = useState(monthNames[getMonth]);
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expenses.filter(expense => isSameMonth(new Date(expense.expenseDate), new Date(`01-${month}-2022`))));

    const renderExpenses = () => {
        return expenses.map(ex => {
            return (
                <ListElement key={ex.key}
                             name={ex.expenseName}
                             value={ex.expenseValue}
                             date={ex.expenseDate}
                             type={ex.expenseType}
                />
            );
        });
    };

    const expensesSummary = expenses.reduce((acc, curr) => {
        return acc + Number(curr.expenseValue);
    }, 0);

    const addExpense = () => {
        if (expense.expenseValue && expense.expenseName) {
            dispatch(expensesActions.addExpense(expense));
            setExpense(initialExpense);
        }
    };


    return (
        <div>
            <Header title={"Expenses"}/>
            <form style={{display: "flex", flexDirection: 'column'}}>
                <Input label={'Expense name:'}
                       type={'text'}
                       value={expense.expenseName}
                       onChange={e => setExpense({...expense, expenseName: e.target.value, key: randomID()})}
                />
                <Input label={'Amount:'}
                       type={'number'}
                       value={expense.expenseValue}
                       onChange={(e) => setExpense({...expense, expenseValue: e.target.value})}
                />
                <Input label={'Date'}
                       type={'date'}
                       value={expense.expenseDate}
                       onChange={(e) => setExpense({...expense, expenseDate: e.target.value})}
                />

                <Select value={expense.expenseType}
                        label={"Type of expense:"}
                    // value={expense.expenseValue}
                        options={expensesTypes}
                        onClick={e => setExpense({...expense, expenseType: e.target.textContent})}
                />
                <Button text={'Add expense'} onClick={() => addExpense()}/>
            </form>
            <section>
                <h2>Your expenses:</h2>
                <Select options={monthNames} label={"Choose month"} value={month}
                        onClick={(e) => setMonth(e.target.textContent)}/>
                {!!expensesSummary && <div>
                    {renderExpenses()}
                    <h3>Your expenses for {month}: ${expensesSummary}</h3>
                </div>}
            </section>
        </div>
    );
};


export default Expenses;
