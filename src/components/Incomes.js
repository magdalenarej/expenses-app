import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {format, isSameMonth, parseISO} from "date-fns";
import {incomesActions} from "../store/store";

const randomID = () => Math.floor(Math.random() * 10000);
const date = format(new Date(), 'yyyy-MM-dd');
const initialIncome = {incomeName: "", incomeValue: '', incomeDate: date, key: 1};
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const getMonth = new Date().getMonth();

const Incomes = () => {
    const [income, setIncome] = useState(initialIncome);
    const [month, setMonth] = useState(monthNames[getMonth]);
    const dispatch = useDispatch();
    const incomes = useSelector(state => state.incomes.filter(income => isSameMonth(new Date(income.incomeDate), new Date(`01-${month}-2022`))));
    console.log(incomes);


    const renderIncomes = () => {
        return incomes.map(incomeVal => {
            return (
                <div key={incomeVal.key}>
                    <span>{incomeVal.incomeName}</span> {' | '}
                    <span>{incomeVal.incomeValue}</span>{' | '}
                    <span>{format(parseISO(incomeVal.incomeDate), "dd MMM yyyy")}</span>
                </div>
            );
        });
    };

    const incomesSummary = incomes.reduce((acc, curr) => {
        return acc + Number(curr.incomeValue);
    }, 0);

    const addIncome = (event) => {
        event.preventDefault();
        dispatch(incomesActions.addIncome(income));
        setIncome(initialIncome);
    };


    return (
        <div className="incomes">
            <form className="add-income-form">
                <input
                    type="text"
                    className="add-income-input-text"
                    value={income.incomeName}
                    onChange={e => setIncome({...income, incomeName: e.target.value, key: randomID()})}
                />
                <input
                    type="number"
                    className="add-income-input-value"
                    value={income.incomeValue}
                    onChange={(e) => setIncome({...income, incomeValue: e.target.value})}
                />
                <input
                    type="date"
                    className="add-income-input-date"
                    value={income.incomeDate}
                    onChange={(e) => setIncome({...income, incomeDate: format(parseISO(e.target.value), 'yyyy-MM-dd')})}
                />
                <button
                    type="submit"
                    className="add-income-btn"
                    onClick={e => addIncome(e)}
                >
                    Add income
                </button>
            </form>
            <section>
                <select value={month} onChange={e => setMonth(e.target.value)}>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <h3>Your incomes for {month}: {incomesSummary}</h3>
                <div className="incomes-items">
                    {renderIncomes()}
                </div>
            </section>
        </div>
    );
};


// const Incomes = (props) => {
//   return (
//     <div className="incomes">
//       <form className="add-income-form">
//         <input
//           type="text"
//           className="add-income-input-text"
//           value={props.incomeName}
//           onChange={(event) => props.setIncomeName(event.target.value)}
//         />
//         <input
//           type="number"
//           className="add-income-input-value"
//           value={props.income}
//           onChange={(event) => props.setIncome(event.target.value)}
//         />
//         <input
//           type="date"
//           className="add-income-input-date"
//           value={props.incomeDate}
//           onChange={(event) => props.setIncomeDAte(event.target.value)}
//         />
//         <button
//           type="submit"
//           className="add-income-btn"
//           onClick={props.getIncomeHandler}
//         >
//           Add income
//         </button>
//       </form>
//       <ul className="incomes-list">{props.incomesList}</ul>
//       <h3>Your incomes: {props.incomesSummary}</h3>
//     </div>
//   );
// };

export default Incomes;
