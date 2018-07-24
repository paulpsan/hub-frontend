import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "fecha"
})
export class FechaPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    moment.locale("es");
    let fecha = moment(value).format("DD-MMM-YYYY, h:mm:ss a").toUpperCase();
    return fecha;
  }
}
