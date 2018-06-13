import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable()
export class SubirArchivoService {
  constructor() {}

  subirArchivo(archivo: File, tipo: string, id) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append("avatar", archivo, archivo.name);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Imagen subida");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("Fallo la subida");
            reject(xhr.response);
          }
        }
      };

      let url = environment.url + "upload/" + tipo + "/" + id;

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }
}
