import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterBy"
})
export class FilterByPipe implements PipeTransform {
  transform(array: [], args?: any) {
    // console.log("Filter pipe: ", array, " - ", args);
    if (array) {
      if (!args.property && !args.userItem) {
        console.log("1");
        return array;
      }
      if (args.property && args.userItem) {
        console.log("2");
        return array.filter(
          user => user[args.property] === args.userItem[args.property]
        );
      }
      console.log("3");
      return array;
    }
  }
}
