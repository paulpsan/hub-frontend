import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environments/environment";

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string): any {
    let url = environment.url + "upload";
    if (!img) {
      return url + "/usuarios/xxx";
    }

    if (img.indexOf("https") >= 0) {
      return img;
    }

    switch (tipo) {
      case "usuario":
        url += "/usuarios/" + img;
        break;

      case "repositorios":
        url += "/repositorios/" + img;
        break;

      case "proyecto":
        url += "/proyectos/" + img;
        break;

      default:
        console.log("tipo de imagen no existe");
        url += "/usurios/xxx";
    }

    return url;
  }
}
