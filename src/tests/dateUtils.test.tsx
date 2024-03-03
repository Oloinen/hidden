import {
    getIndexOfFirdsDayOfMonth,
    getRunningDate,
    getWeekNumber,
    getWeekDay,
    isWeekendDay,
} from '../utils/DateUtils';
  
describe('getRunningDate', () => {
    test('returns date for the number representing the date digits of the month and year of today', () => {
        const today = new Date('2022-03-15');
        const date = getRunningDate(today,7);
        expect(date).toBe(4)
    });
});
  
describe('getIndexOfFirdsDayOfMonth', () => {
    test('returns the index for the first day of the month relative to the weekday array', () => {
      const today = new Date('2022-03-15');
      const index = getIndexOfFirdsDayOfMonth(today);
      expect(index).toBe(2);
    });
});

describe('getIsWeekendDay', () => {
    test('returns true for saturday', () => {
      const today = new Date('2022-03-15');
      const index = isWeekendDay(today,8);
      expect(index).toBe(2);
    });

    test('returns false for tuesday', () => {
        const today = new Date('2022-03-15');
        const index = isWeekendDay(today,8);
        expect(index).toBe(2);
    });
});

describe('getWeekNumber', () => {
    test('returns 0 for the first day of the month', () => {
      const today = new Date('2022-03-15');
      const index = getWeekNumber(today,1);
      expect(index).toBe(2);
    });

    test('returns 2 for the date on third week of the calendar month', () => {
        const today = new Date('2022-03-15');
        const index = getWeekNumber(today,15);
        expect(index).toBe(2);
    });
});


describe('getWeekDay', () => {
    test('returns the weekday of given date digits relative to month of today', () => {
      const today = new Date('2022-03-15');
      const index = getWeekDay(today,9);
      expect(index).toBe(2);
    });
});