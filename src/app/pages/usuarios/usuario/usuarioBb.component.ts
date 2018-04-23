import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from "@angular/core";
import { Usuario } from "../../../models/usuario";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Chart } from "chart.js";

@Component({
  selector: "hub-usuario",
  templateUrl: "./usuarioBb.component.html",
  styleUrls: ["./usuario.component.css"]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioBbComponent implements OnInit {
  id: number;
  acciones: string;
  usuario: Usuario;
  private sub: any;
  commitsTotal: number = 0;
  lenguajes = [];
  commitProyecto;
  commitlenguaje;
  primerCommit;
  UltimoCommit;
  data$ = {};
  dataLenguajes$;
  showUsuarios: boolean = false;
  usuarioProyecto;
  proyectoSelect;
  show: boolean = false;

  starList: boolean[] = [true, true, true, true, true];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log("controlador");
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    if (this.id) {
      //edit form
      this._httpService.buscarId("usuarios", this.id).subscribe(
        resp => {
          this.id = resp._id;
          this.usuario = resp;
          this.chartCommitsRender(this.usuario);

          for (let value of this.usuario.datos) {
            this.commitsTotal += value.commits.length;
            if (value.lenguajes) {
              console.log(value.lenguajes);
              if (this.lenguajes.indexOf(value.lenguajes) != 0) {
                this.lenguajes.push(value.lenguajes);
              }
            }
          }
          this.show = true;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  chartCommitsRender(usuario) {
    console.log(usuario);
    
    this.data$ = usuario.datos;
  }

  getUsuarios(proyecto, tipo) {
    let token = localStorage.getItem("token");
    console.log(proyecto, token);
    this.dataLenguajes$ = proyecto.lenguajes;
    this.proyectoSelect = proyecto;
    this.getPrimerCommit(proyecto);
    this.getUltimoCommit(proyecto);
    let datos = [];
    for (let commits of proyecto.commits) {
      console.log(commits);
      datos.push({
        name: commits.author.user.display_name,
        avatar_url: commits.author.user.links.avatar.href,
        web_url: commits.author.user.links.html.href
      });
    }
    //elimina repetidos de datos
    var hash = {};
    datos = datos.filter(function(current) {
      var exists = !hash[current.name] || false;
      hash[current.name] = true;
      return exists;
    });
    console.log(datos);
    this.usuarioProyecto = datos;
    this.showUsuarios = true;
  }
  getLenguajes(usuario) {
    console.log(usuario);
    let arrarResp = [];
    for (let value of usuario.datos) {
      let leng = JSON.stringify(value.lenguajes);
      let array = leng.split(",");
      let lengProyectos = [];
      for (let val of array) {
        let cadena = val.replace(/[{""}]/g, "").split(":");
        lengProyectos.push({
          lenguaje: cadena[0],
          codigo: cadena[1]
        });
      }
      arrarResp.push(lengProyectos);
    }
    console.log(arrarResp);
  }
  getPrimerCommit(proyecto) {
    if (proyecto.commits.length >= 1) {
      let tamano = proyecto.commits.length;
      this.primerCommit = proyecto.commits[tamano - 1].date;
    } else {
      this.primerCommit = "no existe";
    }
  }

  getUltimoCommit(proyecto) {
    if (proyecto.commits.length >= 1) {
      this.UltimoCommit = proyecto.commits[0].date;
    } else {
      this.UltimoCommit = "no existe";
    }
  }

  editarUsuario(usuario: Usuario) {
    console.log(usuario);
    if (usuario) {
      this.router.navigate(["/usuarios/editar", usuario._id]);
    }
  }

  eliminarUsuario(usuario: Usuario): void {
    console.log(usuario);
    let dialogRef = this.dialog.open(ModalEliminarUsuario, {
      width: "350px",
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this._httpService.eliminarId("usuarios", result._id).subscribe(res => {
          //AQUI colocamos las notificaciones!!
          // setTimeout(()=>
          // {
          //   this.obtenerUsuarios();
          // }, 1000);
          // console.log('done');
          this.router.navigate(["/usuarios/"]);
        });
      }
    });
  }
}

@Component({
  selector: "modal-eliminar-usuario",
  templateUrl: "modal-eliminar-usuario.html"
})
export class ModalEliminarUsuario {
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
