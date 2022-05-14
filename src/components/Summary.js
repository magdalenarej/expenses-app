import {useSelector} from "react-redux";
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {useEffect, useState} from "react";

const initialData = {
    labels: ["groceries", "bills", "education", "clothes", "health", "entertainment", "other"],
    datasets: [
        {
            label: "# of Votes",
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


ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = () => {
    const expenses = useSelector(state => state.expenses);
    const [data, setData] = useState(initialData);

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
    }, [expenses]);


    return (
        <div>
            <div className="summary">
                <h1>Summary: </h1>
            </div>
            <div style={{width: "500px", margin: "0 auto"}}>
                <Doughnut data={data}/>
            </div>
        </div>
    );
};

export default Summary;
