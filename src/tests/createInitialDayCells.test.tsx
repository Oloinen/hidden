import { getDaysInMonth, getWeeksInMonth } from 'date-fns';
import { getTitleAndCompletionStatus, createInitialDayCells } from '../components/TableContainer';
import { getIndexOfFirdsDayOfMonth } from '../utils/DateUtils';
import programDataAllWeeksIncomplete from './fixtures/all_weeks_incomplete.json';

jest.mock('date-fns', () => {
    const originalModule = jest.requireActual('date-fns');
    return {
      __esModule: true,
      ...originalModule,
      getDaysInMonth: jest.fn(),
      getWeeksInMonth: jest.fn()
    };
});

const mockedGetDaysInMonth = getDaysInMonth as jest.MockedFunction<typeof getDaysInMonth>;
const mockedGetWeeksInMonth = getWeeksInMonth as jest.MockedFunction<typeof getWeeksInMonth>;

jest.mock('../components/TableContainer', () => ({
  ...jest.requireActual('../components/TableContainer'),
  getTitleAndCompletionStatus: jest.fn(),
}));

const mockedGetTitleAndCompletionStatus = getTitleAndCompletionStatus as jest.MockedFunction<typeof getTitleAndCompletionStatus>

jest.mock('../utils/DateUtils');
const mockedGetIndexOfFirstDayOfMonth = getIndexOfFirdsDayOfMonth as jest.MockedFunction<typeof getIndexOfFirdsDayOfMonth>

describe('createInitialDayCells', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

  test('returns correct number of day cells for a 5 week month', () => {
    const today = new Date('2024-03-01');
    
    mockedGetDaysInMonth.mockReturnValue(31);
    mockedGetWeeksInMonth.mockReturnValue(5);
    mockedGetIndexOfFirstDayOfMonth.mockReturnValue(4);
    mockedGetTitleAndCompletionStatus.mockReturnValue({ title: '', completed: true });

    const result = createInitialDayCells(programDataAllWeeksIncomplete, today);

    expect(result).toHaveLength(35);

  });

test('returns correct number of day cells for a 4 week calendar month', () => {
    const today = new Date('2024-03-01');
    
    mockedGetDaysInMonth.mockReturnValue(28);
    mockedGetWeeksInMonth.mockReturnValue(4);
    mockedGetIndexOfFirstDayOfMonth.mockReturnValue(4);
    mockedGetTitleAndCompletionStatus.mockReturnValue({ title: '', completed: true });

    const result = createInitialDayCells(programDataAllWeeksIncomplete, today);

    expect(result).toHaveLength(28);
});

test('returns correct number of day cells for a 6 week calendar month', () => {
    const today = new Date('2024-03-01');
    
    mockedGetDaysInMonth.mockReturnValue(31);
    mockedGetWeeksInMonth.mockReturnValue(6);
    mockedGetIndexOfFirstDayOfMonth.mockReturnValue(4);
    mockedGetTitleAndCompletionStatus.mockReturnValue({ title: '', completed: true });

    const result = createInitialDayCells(programDataAllWeeksIncomplete, today);

    expect(result).toHaveLength(42);
});
});

