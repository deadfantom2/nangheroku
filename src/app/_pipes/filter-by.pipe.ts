import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(array: [], args?: any) {
    if (array != null) {
      return array.filter(a => {
        console.log(a[args.property])
        return a
      })

      // console.log(array)
      // console.log(args)
      // return array;
    }
  }

}
