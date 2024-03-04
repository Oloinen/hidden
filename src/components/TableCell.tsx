import classNames from 'classnames';
import _ from 'lodash';
import { isToday } from '../utils/DateUtils';
import './TableCell.scss';

interface TableCellProps {
    title: string;
    date: string | number;
}

const TableCell = (props: TableCellProps): JSX.Element => {
    const { title, date } = props;
    const isDateToday = _.isNumber(date) ? isToday(date) : false;
    const hasTitle = title.length !== 0;

    const cellClassName = classNames({
        'cell-highlighted': isDateToday,
        'cell-regular': !isDateToday && !hasTitle,
        'cell-titled': !isDateToday && hasTitle
    });

    return (
    <td className={cellClassName} key={date} data-cy={'day-cell'}>
        <h2 data-cy={'day-cell-date'} className='date'>{date}</h2>
        <h3 data-cy={'day-cell-title'} className='title'>{title.toUpperCase()}</h3>
    </td>
)};

export default TableCell;