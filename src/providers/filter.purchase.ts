export class FilterPurchaseProvider {
  private static DEFAULT_ACTION = "week";
  public static action: string = FilterPurchaseProvider.DEFAULT_ACTION;
  public static period:any = { from: '', to: ''};
}
