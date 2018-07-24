import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environments/environment";

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string): any {
    console.log(img);
    let url = environment.url + "upload";
    if (!img) {
      if (tipo == "usuario") return "assets/images/avatar-user.png";
      else return "assets/images/avatar-repo.png";
    }

    if (img.indexOf("http") >= 0) {
      return img;
    }

    switch (tipo) {
      case "usuario":
        url += "/usuarios/" + img;
        break;

      case "repositorio":
        url += "/repositorios/" + img;
        break;

      case "proyecto":
        url += "/proyectos/" + img;
        break;

      default:
        url = "assets/images/avatar-user.png";
    }
    return url;
  }
}
