import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fileType"
})
export class FileTypePipe implements PipeTransform {
  transform(file: any, args: any) {

    let url = "assets/";

    console.log("file: ", file, " --- args: ", args)
    if (!file) {
      console.log("nety")
    }

    const typeFile = file.file_id.name.split('.')[1];

    if (args.type === "files") {
      switch (typeFile) {
        case "pdf":
          url += "pdf.png";
          break;
        case "doc":
        case "docx":
          url += "word.png";
          break;
        case "xls":
        case "xlsx":
          url += "excel.png";
          break;
        case "ppt":
        case "pptx":
          url += "powerpoint.png";
          break;
        default:
          url += "notFile.png";
      }
      return url
    }


  }
}
