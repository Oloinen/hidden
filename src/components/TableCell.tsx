import classNames from 'classnames';
import './TableCell.scss';

interface TableCellProps {
    title: string;
    date: string | number;
}

const TableCell = (props: TableCellProps): JSX.Element => {
    const { title, date} = props;
    const isToday = date === new Date().getDate();
    const hasTitle = title.length !== 0;

    const cellClassName = classNames({
        'cell-highlighted': isToday,
        'cell-regular': !isToday && !hasTitle,
        'cell-titled': !isToday && hasTitle
    });

    return (
    <td className={cellClassName} key={date}>
        <h2 className='date'>{date}</h2>
        <h3 className='title'>{title.toUpperCase()}</h3>
    </td>
)};

export default TableCell;