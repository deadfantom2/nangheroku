import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "urlFile"
})
export class UrlFilePipe implements PipeTransform {
  transform(file: any, args: any) {

    let url = "http://localhost:3000/image";

    console.log("file: ", file, " --- args: ", args)
    if (!file) {
      console.log("nety")
      return url + "/profile/nonimage";
    }

    // if (file.indexOf('https') >= 0) {
    //   return file;
    // }

    switch (args.type) {
      case "profile":
        url += "/profile/" + args.userId + '/' + file.name;
        break;
      case "files":
        url += "/files/" + args.userId + '/' + file.file_id.name;
        console.log(file.file_id.name.split('.')[1])
        break;
      case "photos":
        url += "/photos/" + args.userId + '/' + file.file_id.name;
        break;
      default:
        url += "/profile/";
    }
    return url

  }
}
