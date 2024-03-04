import { DATE_FORMAT_WEEKDAYS } from '../constants/CommonConstants';
import { getWeekOfMonth, isWeekend } from 'date-fns';

export const isToday = (date: number): boolean => {
    return date === getToday().getDate();
}

export const getFirstWeekDayOfMonth = (today: Date): Date => {
    return new Date(today.getFullYear(), today.getMonth(), 1);
};

// Returns index for the first day of the month for a week starting from monday
export const getIndexOfFirdsDayOfMonth = (today: Date): number => {
    const startDate = getFirstWeekDayOfMonth(today);
    
    return DATE_FORMAT_WEEKDAYS.indexOf(DATE_FORMAT_WEEKDAYS[startDate.getDay()]) - 1;
};

export const getRunningDate = (today: Date, date: number) => {
    return new Date(today.getFullYear(), today.getMonth(), date);
}

// Returns week number of the calendar grid month starting from 0 for the first week
export const getWeekNumber = (today: Date, date: number) => {
    const runningDate = getRunningDate(today, date);

    return getWeekOfMonth(runningDate)-1;
}

export const getWeekDay = (today: Date, date: number): string => {
    const runningDate = getRunningDate(today, date);
    return DATE_FORMAT_WEEKDAYS[runningDate.getDay()];
}

export const isWeekendDay = (today: Date, date: number): boolean => {
    const runningDate = getRunningDate(today, date);
    return isWeekend(runningDate);
}

export const getToday = () => {
    if (process.env.REACT_APP_TODAY) {
        return new Date(process.env.REACT_APP_TODAY);
    }
    return new Date();
}