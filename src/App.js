import {BrowserRouter, Routes, Route} from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Incomes from "./components/Incomes";
import Expenses from "./components/Expenses";
import Summary from "./components/Summary";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav/>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route
                        path="incomes"
                        element={<Incomes/>}/>
                    <Route
                        path="expenses"
                        element={<Expenses/>}
                    />
                    <Route
                        path="summary"
                        element={<Summary/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
