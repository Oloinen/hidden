import _ from 'lodash';
import TableHeader from './TableHeader';
import DayCell from '../classes/DayCell';
import TableCell from './TableCell';
import { isWeekendDay } from '../utils/DateUtils';

import './Table.scss'

interface TableProps {
    dayCellArray: DayCell[];
    today: Date;
}

const filterDataForCalendar = (dayCellArray: DayCell[], today: Date): DayCell[][] => {
    const todaysDate = today.getDate();

    const programsToBeMoved = dayCellArray
        .filter(day => day.date as number < todaysDate && !day.completed)
        .map(day => day.title);  

    const newArray = dayCellArray.map((day) => {
        const { date, title } = day;

        if (date as number < todaysDate) {
            return programsToBeMoved.includes(title) 
            ? new DayCell(date, '')
            : new DayCell(date, title);
        } else if (programsToBeMoved.length) {
            if (isWeekendDay(today, date as number)) {
                return new DayCell(day.date, day.title)
            }
            if (title.length > 0) {
                programsToBeMoved.push(title)
            }
            const newTitle = programsToBeMoved.shift();
            return new DayCell(date, newTitle as string);
        }
        return new DayCell(date, title)               
    });
    return _.chunk(newArray,7);
}

const Table = ({ dayCellArray, today }: TableProps) => {

    const renderRow = (weekDays: DayCell[], index: number): JSX.Element => (      
        <tr data-cy='day-cell-row' key={weekDays[index].title+index}>
            {weekDays.map((weekDay: DayCell, index: number) => {
                const { title, date } = weekDay;
                return (
                    <TableCell 
                        title={title} 
                        date={date}
                        key={title+index}
                    />
                )
            })}
        </tr>
    );

    return (
        <>
            <thead>
                <TableHeader />
            </thead>
            <tbody>
                {dayCellArray && filterDataForCalendar(dayCellArray, today).map((weekDays: DayCell[], index: number) => renderRow(weekDays, index))}
            </tbody>
        </>
    )
};

export default Table;