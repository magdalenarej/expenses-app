import SelectOption from "../SelectOption/SelectOption";
import {useState} from "react";
import './Select.css';

const Select = ({options, value, onClick, label}) => {
    const renderOptions = () => {
        return options.map((option, i) => {
            return <SelectOption key={option} value={option} onClick={onClick}>{option}</SelectOption>;
        });
    };

    const [isOpen, setIsOpen] = useState(false);

    return (<>
        <h4>{label}</h4>
        <div className={'select-header'} onClick={() => setIsOpen(!isOpen)}>{value}</div>
        {isOpen && <ul onClick={() => {
            setIsOpen(!isOpen);
        }} className={'select'}>
            {renderOptions()}
        </ul>}
    </>);
};

export default Select;