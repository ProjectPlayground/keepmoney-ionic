export class DateUtils {

  constructor() {}

  public static today(): string {
    return new Date().toJSON().slice(0,10);
  }
}
