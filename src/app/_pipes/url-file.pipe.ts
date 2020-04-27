import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

@Pipe({
  name: "urlFile"
})
export class UrlFilePipe implements PipeTransform {
  transform(file: any, args: any) {
    let url = environment.apiUrl + "/image";

    console.log("file: ", file);
    console.log("args", args);
    if (!file) {
      if (args.userImg.link) {
        return (url = args.userImg.link);
      }
      url + "/profile/nofolder/noimage";
    }

    // if (file.indexOf('https') >= 0) {
    //   return file;
    // }

    switch (args.type) {
      case "profile":
        if (args.userImg.name !== "") {
          url += "/profile/" + args.userId + "/" + file;
        } else {
          return args.userImg.name.link;
        }
        break;
      case "files":
        url += "/files/" + args.userId + "/" + file.file_id.name;
        break;
      case "photos":
        url += "/photos/" + args.userId + "/" + file.file_id.name;
        break;
      default:
        url += "/profile/";
    }
    return url;
  }
}
