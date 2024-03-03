import _ from 'lodash';
import TableHeader from './TableHeader';
import DayCell from '../classes/DayCell';
import TableCell from './TableCell';
import { isWeekendDay, getToday } from '../utils/DateUtils';

import './Table.scss'

interface TableProps {
    dayCellArray: DayCell[];
}

const filterDataForCalendar = (dayCellArray: DayCell[], today: Date): DayCell[][] => {
    const todaysDate = today.getDate();

    const pastProgramsToBeMoved = dayCellArray
        .filter(day => day.date as number <= todaysDate && !day.completed)
        .map(day => day.title);  

    const allProgramsToBeMoved = dayCellArray
        .filter(day => !day.completed)
        .map(day => day.title);

    const newArray = dayCellArray.map((day) => {
        const { date, title } = day;

        if (date as number < todaysDate) {
            return pastProgramsToBeMoved.includes(title) 
            ? new DayCell(date, '')
            : new DayCell(date, title);
        } else if (allProgramsToBeMoved.length) {
            if (isWeekendDay(today, date as number)) {
                return new DayCell(day.date, day.title)
            }
            const newTitle = allProgramsToBeMoved.shift();
            return new DayCell(date, newTitle as string);
        }
        return new DayCell(date, title)               
    });
    return _.chunk(newArray,7);
}

const Table = ({ dayCellArray }: TableProps) => {
    const today: Date = getToday();

    const renderRow = (weekDays: DayCell[], index: number): JSX.Element => {
        return (      
            <tr key={`${weekDays[index].date}+${index}`}>
                {weekDays.map((weekDay: DayCell, index: number) => (
                    <TableCell title={weekDay.title} date={weekDay.date} key={`${weekDay.date}+${index}`}/>
                ))}
            </tr>
        );
    };

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