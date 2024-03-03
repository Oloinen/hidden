export default class DayCell {
    title: string;
    date: number | string;
    completed?: boolean;
  
    constructor(date: string | number, title: string, completed?: boolean) {
      this.title = title;
      this.date = date;
      this.completed = completed;
    }
}