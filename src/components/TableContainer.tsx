import { useEffect, useState } from 'react';
import { getDaysInMonth, getWeeksInMonth } from "date-fns";
import { fetchData, ProgramData } from '../api/ProgramApi';
import { getIndexOfFirdsDayOfMonth, getWeekDay, getWeekNumber, getToday } from "../utils/DateUtils";
import DayCell from '../classes/DayCell';

import './TableContainer.scss';
import Table from './Table';

export const getTitleAndCompletionStatus = (programData: ProgramData, date: number, today: Date) => {
    const key = 'week' + (getWeekNumber(today, date));
    const programWeek = programData[key as keyof ProgramData] || [];
 
    const weekDay = getWeekDay(today, date);
    const { title = '', completed = true } = Object.values(programWeek)
        .find(item => item.weekday === weekDay) || {};

    return { title, completed };
};

export const createInitialDayCells = (programData: ProgramData, today: Date): DayCell[] => {
    const daysInMonth: number = getDaysInMonth(today);
    const daysInCalendarGrid = getWeeksInMonth(today) * 7;
    const indexOfFirstDay: number = getIndexOfFirdsDayOfMonth(today);
    
    const array: DayCell[] = [];

    let dayCounter = 1;
    for (let step = 0; step < daysInCalendarGrid; step++) {
        const isFirstEmptyDays = step < indexOfFirstDay;
        const hasDateNumber = !isFirstEmptyDays && dayCounter <= daysInMonth;
        
        if (hasDateNumber) {
            const { title, completed } = getTitleAndCompletionStatus(programData, dayCounter, today);               
            array.push(new DayCell(dayCounter, title, completed));
            dayCounter++;
        } else {
            array.push(new DayCell('','', true));
        } 
    }
    return array;
};

const TableContainer = (): JSX.Element => {
    const [dayCellData, setDayCellData] = useState<DayCell[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const today: Date = getToday();

    useEffect(() => {
        const fetchProgramData = async () => {
            try {
                const response: ProgramData = await fetchData() as ProgramData;
                setDayCellData(createInitialDayCells(response, today));
              setError(null);
            } catch (error) {
              setError('Error while loading the page. Please try again.');
            }
        };

        fetchProgramData();
    }, [today]);

    return (
        <div>
            {error ? (
                <div className='error-message'>
                    {error}
                </div>
            ) : (
                <table className='table-wrapper'>
                    <thead>
                        <tr>
                            <td colSpan={7} className='heading'>
                                <h1 className='heading-text'>Weekly Program</h1>
                            </td>
                        </tr>
                    </thead>                   
                    {dayCellData ? (
                        <Table dayCellArray={dayCellData} />
                    ) : (
                        <div className='loading-message'>Loading...</div>
                    )}
            </table>
            )}
        </div>
    )
};

export default TableContainer;