import './Input.css';

const Input = ({label, type, value, onChange}) => {
    return (
        <label htmlFor={value}>
            {label}
            <input
                type={type}
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

export default Input;