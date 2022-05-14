import { Link } from "react-router-dom";

const Nav = () => {
    return(
        <nav>
            <h2>Expenses tracker</h2>
            <Link to="/">Home</Link> |{" "}
            <Link to="incomes">Incomes</Link> |{" "}
            <Link to="expenses">Expenses</Link> |{" "}
            <Link to="summary">Summary</Link>
        </nav>
    )
}

export default Nav;