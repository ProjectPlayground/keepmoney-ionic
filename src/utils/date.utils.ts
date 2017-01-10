import * as moment_ from 'moment';
export const moment =  moment_["default"];
import 'moment-range';

export class DateUtils {

  constructor() {}

  public static today(): string {
    return new Date().toJSON().slice(0,10);
  }

  public static fromString(dateString: string): Date {
    return new Date(dateString);
  }

  public static isDayOfThisWeek(date: Date): boolean {
    return moment.range(this.startOfWeek(), this.endOfWeek()).contains(date);
  }

  public static startOfWeek(): Date {
    return moment().day(1).toDate();
  }

  public static endOfWeek(): Date {
    return moment().day(7).toDate();
  }

  public static isDayOfThisMonth(date: Date): boolean {
    let begin = moment().format("YYYY-MM-01");
    let end = moment().format("YYYY-MM-") + moment().daysInMonth();
    return moment.range(begin, end).contains(date);
  }

  public static isDayOfThePeriod(date: Date, from: Date, to: Date): boolean {
    return moment.range(from, to).contains(date);
  }
}
