import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "imageDisplay"
})
export class ImageDisplayPipe implements PipeTransform {
  transform(file: any, args: any) {

    let url = "http://localhost:3000/image";

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
