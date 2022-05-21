import "./ListElement.css";
import {format, parseISO} from "date-fns";

const ListElement = ({name, value, date, type}) => {
    return (
        <div key={name + date} className={'element'}>
            <span>{name}</span>
            <span>${value}</span>
            <span>{format(parseISO(date), "dd MMM yyyy")}</span>
            {type && <span>{type}</span>}
        </div>
    );
};

export default ListElement;