import { getTitleAndCompletionStatus, createInitialDayCells } from '../components/TableContainer';
import { getWeekDay, getWeekNumber, getIndexOfFirdsDayOfMonth } from '../utils/DateUtils';
import programDataAllWeeksIncomplete from './fixtures/all_weeks_incomplete.json';
import { getDaysInMonth, getWeeksInMonth } from 'date-fns';

jest.mock('../utils/DateUtils');
const mockedGetWeekDay = getWeekDay as jest.MockedFunction<typeof getWeekDay>;
const mockedGetWeekNumber = getWeekNumber as jest.MockedFunction<typeof getWeekNumber>;
const mockedGetIndexOfFirstDayOfMonth = getIndexOfFirdsDayOfMonth as jest.MockedFunction<typeof getIndexOfFirdsDayOfMonth>

describe('getTitleAndCompletionStatus', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns title and completion status for a given date', () => {
    const today = new Date('2023-03-15');
    const date = 10;

    mockedGetWeekNumber.mockReturnValue(1);
    mockedGetWeekDay.mockReturnValue('Monday');

    const result = getTitleAndCompletionStatus(programDataAllWeeksIncomplete, date, today);

    expect(result.title).toBe('Task 1');
    expect(result.completed).toBe(false);
  });

  test('returns default values when no matching data is found', () => {
    const today = new Date('2023-03-15');
    const date = 10;
    
    mockedGetWeekNumber.mockReturnValue(1);
    mockedGetWeekDay.mockReturnValue('Monday');

    const result = getTitleAndCompletionStatus(programDataAllWeeksIncomplete, date, today);

    expect(result.title).toBe('');
    expect(result.completed).toBe(true);
  });
});

jest.mock('date-fns', () => {
    const originalModule = jest.requireActual('date-fns');
    return {
      __esModule: true,
      ...originalModule,
      getDaysInMonth: 'mocked foo',
    };
});

const mockedGetDaysInMonth = getDaysInMonth as jest.MockedFunction<typeof getDaysInMonth>;
const mockedGetWeeksInMonth = getWeeksInMonth as jest.MockedFunction<typeof getWeeksInMonth>;

jest.mock('../components/Table');
const mockedGetTitleAndCompletionStatus = getTitleAndCompletionStatus as jest.MockedFunction<typeof getTitleAndCompletionStatus>

describe('createInitialDayCells', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

test('returns an array of DayCell objects for a given month', () => {
    const today = new Date('2023-03-15');
    
    mockedGetDaysInMonth.mockReturnValue(31);
    mockedGetWeeksInMonth.mockReturnValue(5);
    mockedGetIndexOfFirstDayOfMonth.mockReturnValue(1);
    mockedGetTitleAndCompletionStatus.mockReturnValue({ title: 'Task 1', completed: false }); // Example title and completion status

    const result = createInitialDayCells(programDataAllWeeksIncomplete, today);

    expect(result).toHaveLength(35);

});
});