import { Pipe, PipeTransform } from '@angular/core';
import { UsersService } from '../_services';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  constructor(private _usersService: UsersService) {

  }

  transform(array: [], args?: any) {
    console.log('FILTER PIPE')
    console.log(array)
    console.log(args)
    if (array != null) {


      return array.filter(item => {
        console.log(args.user)
        if (!args.user) {
          return array;
        }
        if (args.user || args.user) {
          return item[args.property] === args.user
        }
      })
    }
  }

}
