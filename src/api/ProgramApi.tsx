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

export default class BaseApi {
    public async fetchData(): Promise<ProgramData | undefined> {
        try {
            const response = await fetch('./program.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
          throw new Error(`Error while fetching data, ${error}`)
        }
    }
}