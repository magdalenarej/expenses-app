import {Link} from "react-router-dom";
import './Nav.css';

const Nav = () => {
    return (
        <nav>
            <h2>Expenses tracker</h2>
            <Link to="/" className={'link'}>Home</Link> |{" "}
            <Link to="incomes" className={'link'}>Incomes</Link> |{" "}
            <Link to="expenses" className={'link'}>Expenses</Link> |{" "}
            <Link to="summary" className={'link'}>Summary</Link>
        </nav>
    );
};

export default Nav;