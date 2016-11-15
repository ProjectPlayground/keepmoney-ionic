import { Pipe } from "@angular/core";

import _ from 'underscore';


@Pipe({ name: 'orderBy' })
export class OrderByPipe {
  transform(array, args) {
    return _.sortBy(array, args);
  }
}
