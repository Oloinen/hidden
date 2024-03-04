import { getTitleAndCompletionStatus } from '../components/TableContainer';
import { getWeekDay, getWeekNumber } from '../utils/DateUtils';
import programDataAllWeeksIncomplete from './fixtures/all_weeks_incomplete.json';

jest.mock('../utils/DateUtils');
const mockedGetWeekDay = getWeekDay as jest.MockedFunction<typeof getWeekDay>;
const mockedGetWeekNumber = getWeekNumber as jest.MockedFunction<typeof getWeekNumber>;

describe('getTitleAndCompletionStatus', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns title and completion status for a given date if there is a match with json', () => {
    const today = new Date('2023-03-15');
    const date = 14;

    mockedGetWeekNumber.mockReturnValue(2);
    mockedGetWeekDay.mockReturnValue('MONDAY');

    const result = getTitleAndCompletionStatus(programDataAllWeeksIncomplete, date, today);

    expect(result.title).toBe('Mind on Autopilot');
    expect(result.completed).toBe(false);
  });

  test('returns default values when no matching data is found', () => {
    const today = new Date('2023-03-15');
    const date = 15;
    
    mockedGetWeekNumber.mockReturnValue(2);
    mockedGetWeekDay.mockReturnValue('TUESDAY');

    const result = getTitleAndCompletionStatus(programDataAllWeeksIncomplete, date, today);

    expect(result.title).toBe('');
    expect(result.completed).toBe(true);
  });
});