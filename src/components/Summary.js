import {useSelector} from "react-redux";
import {Doughnut, Bar} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title} from "chart.js";
import {useEffect, useState} from "react";
import {isSameMonth} from "date-fns";
import Select from "./UI/Select/Select";

const initialData = {
    labels: ["groceries", "bills", "education", "clothes", "health", "entertainment", "other"],
    datasets: [
        {
            data: [],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(244,6,6,0.2)",
                "rgb(249,217,72, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgb(5,205,163, 0.2)",
                "rgba(0,0,178,0.58)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};
const initialDataBar = {
    labels: ['incomes', 'expenses'],
    datasets: [
        {
            label: 'sum',
            data: [],
            backgroundColor: [
                "blue",
                "red",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const getMonth = new Date().getMonth();


ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarElement, Title);

const Summary = () => {
    const [month, setMonth] = useState(monthNames[getMonth]);
    const [data, setData] = useState(initialData);
    const [dataSummary, setDataSummary] = useState(initialDataBar);
    const expenses = useSelector(state => state.expenses.filter(expense => isSameMonth(new Date(expense.expenseDate), new Date(`01-${month}-2022`))));
    const incomes = useSelector(state => state.incomes.filter(income => isSameMonth(new Date(income.incomeDate), new Date(`01-${month}-2022`))));


    useEffect(() => {
        const newExpensesByTypes = {
            groceries: 0,
            bills: 0,
            education: 0,
            clothes: 0,
            health: 0,
            entertainment: 0,
            other: 0
        };

        expenses.forEach((expense) => {
                switch (expense.expenseType) {
                    case 'groceries':
                        console.log('goceries');
                        newExpensesByTypes.groceries = newExpensesByTypes.groceries + Number(expense.expenseValue);
                        break;
                    case 'bills':
                        newExpensesByTypes.bills = newExpensesByTypes.bills + Number(expense.expenseValue);
                        break;
                    case 'education':
                        newExpensesByTypes.education = newExpensesByTypes.education + Number(expense.expenseValue);
                        break;
                    case 'clothes':
                        newExpensesByTypes.clothes = newExpensesByTypes.clothes + Number(expense.expenseValue);
                        break;
                    case 'health':
                        newExpensesByTypes.health = newExpensesByTypes.health + Number(expense.expenseValue);
                        break;
                    case 'entertainment':
                        newExpensesByTypes.entertainment = newExpensesByTypes.entertainment + Number(expense.expenseValue);
                        break;
                    case 'other':
                        newExpensesByTypes.other = newExpensesByTypes.other + Number(expense.expenseValue);
                        break;
                }
            }
        );

        setData({
            ...data, datasets: [{...data.datasets[0], data: Object.values(newExpensesByTypes)}]
        });
        setDataSummary({
            ...dataSummary,
            datasets: [{
                ...data.datasets[0], data: [incomes.reduce((acc, next) => {
                    return next.incomeValue;
                }, 0), expenses.reduce((acc, next) => {
                    return next.expenseValue;
                }, 0)]
            }]
        });
    }, [month]);


    return (
        <div style={{
            textAlign: 'center'
        }}>
            <div className="summary">
                <h1>Summary: </h1>
                <Select options={monthNames} label={"Choose month"} value={month}
                        onClick={(e) => setMonth(e.target.textContent)}/>
            </div>
            <div>
                <Bar data={dataSummary} style={{padding: '1rem'}}/>
                <Doughnut data={data} style={{padding: '2rem'}}/>
            </div>
        </div>
    );
};

export default Summary;
