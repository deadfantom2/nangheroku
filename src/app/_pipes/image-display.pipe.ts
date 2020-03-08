import { Pipe, PipeTransform } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Pipe({
  name: "imageDisplay"
})
export class ImageDisplayPipe implements PipeTransform {
  constructor(private http: HttpClient) {}
  async transform(image: any, type: string) {
    const token = localStorage.getItem("id_token");
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    let url = "http://localhost:3000/image";

    try {
      if (!image) {
        return url + "/users/nonimage";
      }

      // if (image.indexOf('https') >= 0) {
      //   return image;
      // }

      switch (type) {
        case "profile":
          url += "/profile/" + image.name;
          break;
        case "files":
          url += "/files/" + image;
          break;
        case "photos":
          url += "/photos/" + image;
          break;
        default:
          url += "/users/nonimage";
      }
      // console.log(url);
      const imageBlob = await this.http
        .get(url, { headers, responseType: "blob" })
        .toPromise();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          // console.log(reader.result);
          return resolve(reader.result as string);
        };
        reader.readAsDataURL(imageBlob);
      });
    } catch {
      // return "/users/nonimage";
    }
  }
}
