import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageDisplay'
})
export class ImageDisplayPipe implements PipeTransform {

  transform(image: any, type: string) {

    // console.log(image)
    // console.log(type)
    let url = 'http://localhost:3000/image';

    if (!image) {
      return url + '/users/nonimage';
    }

    // if (image.indexOf('https') >= 0) {
    //   return image;
    // }

    switch (type) {
      case 'profile':
        url += '/profile/' + image.name;
        break;
      case 'files':
        url += '/files/' + image;
        break;
      case 'photos':
        url += '/photos/' + image;
        break;
      default:
        console.log('url type image not exist');
        url += '/users/nonimage';
    }

    return url;

  }
}
