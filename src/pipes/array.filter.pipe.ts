import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterBy",
  pure: false
})
export class ArrayFilterPipe implements PipeTransform {

  transform(items: Array<any>, conditions: {[field: string]: any}): Array<any> {
    if (!items) return;

    return items.filter(item => {
      for (let field in conditions) {
        if (conditions[field] && (item[field] !== conditions[field])) {
          return false;
        }
      }
      return true;
    });
  }
}
