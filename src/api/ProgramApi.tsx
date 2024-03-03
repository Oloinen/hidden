import { env } from '../env'

export interface ProgramWeekItem {
    weekday: string;
    title: string;
    completed: boolean;
}

export interface ProgramData {
    week1: ProgramWeekItem[];
    week2: ProgramWeekItem[];
    week3: ProgramWeekItem[];
}

export const fetchData = async (): Promise<ProgramData | undefined> => {
    const programPath = env.REACT_APP_PROGRAM_PATH;
    try {
        const program = import(`${programPath}`)
        return program;
    } catch (error) {
      throw new Error(`Error while fetching data, ${error}`)
    }
};