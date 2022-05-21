import './SelectOption.css';

const SelectOption = ({value, onClick}) => {

    return <li onClick={onClick} value={value}>{value}</li>;
};

export default SelectOption;