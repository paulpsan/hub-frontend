import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../environments/environment";

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

    let url = environment.url + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'repositorio':
        url += '/repositorio/' + img;
      break;

      case 'proyecto':
         url += '/proyecto/' + img;
      break;

      default:
        console.log('tipo de imagen no existe');
        url += '/usurios/xxx';
    }

    return url;
  }

}
