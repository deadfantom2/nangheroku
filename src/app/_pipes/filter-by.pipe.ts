import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterBy",
})
export class FilterByPipe implements PipeTransform {
  transform(array: [], args?: any) {
    console.log("Filter pipe: ", array, " - ", args);
    if (array) {
      // if (!args.property && !args.userItem) {
      //   console.log("1");
      //   return array;
      // }
      if (args.property && args.userItem) {
        // console.log(args.property, args.userItem, args.userItem[0]);
        console.log("2");
        console.log("args.property: ", args.property);
        console.log("args.userItem: ", args.userItem);
        // return array.filter((user) => {
        //   return user[args.property] == args.userItem[0];
        // });
      }
      console.log("3");
      return array;
    }
  }
}
