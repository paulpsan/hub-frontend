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
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.css"]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioComponent implements OnInit {
  id: number;
  acciones: string;
  usuario: Usuario;
  private sub: any;
  commitsTotal: number = 0;
  leguajes;
  commitProyecto;
  commitlenguaje;
  primerCommit;
  UltimoCommit;
  data$;
  dataLenguajes$;
  showUsuarios: boolean = false;
  usuarioProyecto;
  proyectoSelect;
  show: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    if (this.id) {
      //edit form
      this._httpService.buscarId("usuarios", this.id).subscribe(
        resp => {
          this.id = resp._id;
          this.usuario = resp;
          this.data$ = resp.datos;
          this.show = true;
          if (this.usuario.tipo == "gitlab") {
            this.calculaCommits(this.usuario);
            this.listaProyectos(this.usuario);
          } else {
            if (this.usuario.tipo == "github") {
              this.calculaCommits(this.usuario);
              this.listaProyectos(this.usuario);
              this.getLenguajes(this.usuario);
            }
          }
          console.log(this.usuario);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  getUsuarios(proyecto, tipo) {

    let token = localStorage.getItem("token");
    console.log(proyecto, token);
    this.dataLenguajes$ = proyecto.lenguajes;
    if (tipo == "gitlab") {
      this.proyectoSelect = proyecto;
      this.getPrimerCommit(proyecto);
      this.getUltimoCommit(proyecto);
      this.usuarioProyecto = proyecto.members;
      this.showUsuarios = true;
      // this._httpService
      //   .obtenerUsuarios("gitlab", proyecto.repo, token)
      //   .subscribe(resp => {
      //     this.showUsuarios = true;
      //     this.usuarioProyecto = resp;
      //     console.log(this.usuarioProyecto);
      //   });
    } else {
      if (tipo == "github") {
        this.proyectoSelect = proyecto;
        this.getPrimerCommit(proyecto);
        this.getUltimoCommit(proyecto);
        // obtenemos usuarios de los commits
        let datos = [];
        for (let commits of proyecto.commits) {
          if (commits.committer)
            datos.push({
              name: commits.commit.author.name,
              avatar_url: commits.committer.avatar_url,
              web_url: commits.committer.url
            });
          else
            datos.push({
              name: commits.commit.author.name,
              avatar_url: "",
              web_url: ""
            });
        }
        var hash = {};
        datos = datos.filter(function(current) {
          var exists = !hash[current.name] || false;
          hash[current.name] = true;
          return exists;
        });
        this.usuarioProyecto = datos;
        this.showUsuarios = true;
        // console.log(this.usuarioProyecto);
      } else {
        //local
      }
    }
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
      this.UltimoCommit =
        proyecto.commits[tamano - 1].committed_date ||
        proyecto.commits[tamano - 1].commit.author.date;
    } else {
      this.UltimoCommit = "no existe";
    }
  }
  getUltimoCommit(proyecto) {
    if (proyecto.commits.length >= 1) {
      this.primerCommit =
        proyecto.commits[0].committed_date ||
        proyecto.commits[0].commit.author.date;
    } else {
      this.primerCommit = "no existe";
    }
  }

  calculaCommits(usuario) {
    for (let value of usuario.datos) {
      this.commitsTotal += value.commits.length;
    }
  }

  listaProyectos(usuario) {
    for (let value of usuario.datos) {
      // this.commitsTotal+=value.commits;
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
