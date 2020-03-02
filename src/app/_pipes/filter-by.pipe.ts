import { Pipe, PipeTransform } from '@angular/core';
import { UsersService } from '../_services';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(array: [], args?: any) {
    console.log('FILTER PIPE')
    console.log(array)
    console.log(args)
    if (array) {
      if (!args.property && !args.userItem) {
        return array;
      }
      if (args.property && args.userItem) {
        return array.filter(user => user[args.property] === args.userItem)
      }
      return array;
    }
  }

}
