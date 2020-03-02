import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(array: [], args?: any) {
    if (array != null) {
      return array.sort((a, b) => {
        if (a[args.property] === '' || a[args.property] === null || typeof a[args.property] === 'undefined') {
          return 1 * args.direction; // When, haven't data 
        }
        if (b[args.property] === '' || b[args.property] === null || typeof b[args.property] === 'undefined') {
          return -1 * args.direction; // When, haven't data 
        }

        if (a[args.property] < b[args.property]) {
          return -1 * args.direction;
        }
        else if (a[args.property] > b[args.property]) {
          return 1 * args.direction;
        }
        else {
          return 0;
        }
      });
    }
  }
}
