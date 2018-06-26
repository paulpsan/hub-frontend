import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environments/environment";

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string): any {
    let url = environment.url + "upload";
    console.log(img);
    if (!img) {
      if (tipo == "usuario") return "assets/images/avatar-user.png";
      else return "assets/images/xxx.png";
    }

    if (img.indexOf("http") >= 0) {
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
        url = "assets/images/avatar-user.png";
    }

    return url;
  }
}
