import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {format, isSameMonth, parseISO} from "date-fns";
import {incomesActions} from "../store/store";
import Input from "./UI/Input/Input";
import Button from "./UI/Button/Button";
import Select from "./UI/Select/Select";
import Header from "./UI/Header/Header";
import ListElement from "./UI/ListeElement/ListElement";

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


    const renderIncomes = () => {
        return incomes.map(incomeVal => {
            return (
                <ListElement key={incomeVal.key}
                             name={incomeVal.incomeName}
                             value={incomeVal.incomeValue}
                             date={incomeVal.incomeDate}
                />
            );
        });
    };

    const incomesSummary = incomes.reduce((acc, curr) => {
        return acc + Number(curr.incomeValue);
    }, 0);

    const addIncome = () => {
        if (income.incomeValue && income.incomeName) {
            dispatch(incomesActions.addIncome(income));
            setIncome(initialIncome);
        }
    };


    return (
        <div>
            <Header title={"Incomes"}/>
            <form style={{display: "flex", flexDirection: 'column'}}>
                <Input
                    label={"Income from:"}
                    type={"text"}
                    value={income.incomeName}
                    onChange={e => setIncome({...income, incomeName: e.target.value, key: randomID()})}
                />
                <Input
                    label={"Amount:"}
                    type={'number'}
                    value={income.incomeValue}
                    onChange={(e) => setIncome({...income, incomeValue: e.target.value})}
                />
                <Input
                    label={"Date:"}
                    type={'date'}
                    value={income.incomeDate}
                    onChange={(e) => setIncome({...income, incomeDate: format(parseISO(e.target.value), 'yyyy-MM-dd')})}
                />
                <Button text={'Add income'} onClick={() => addIncome()}/>
            </form>
            <section>
                <h2>Your incomes:</h2>
                <Select options={monthNames} label={"Choose month"} value={month}
                        onClick={(e) => setMonth(e.target.textContent)}/>
                {!!incomesSummary && <div>
                    {renderIncomes()}
                    <h3>Your incomes for {month}: ${incomesSummary}</h3>
                </div>}
            </section>
        </div>
    );
};


export default Incomes;
