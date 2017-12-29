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
  showUsuarios:boolean=false;
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
          }
          else{
            if(this.usuario.tipo == "github"){
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
  getUsuarios(proyecto){
    let token=localStorage.getItem("token");
    console.log(proyecto,token)
    this.proyectoSelect=proyecto;
    this.getPrimerCommit(proyecto);
    this.getUltimoCommit(proyecto);
    this._httpService.obtenerUsuarios("gitlab", proyecto.repo,token).subscribe(
      resp => {
        this.showUsuarios=true;
        this.usuarioProyecto=resp;

        console.log(resp);
      });
  }
  getLenguajes(usuario){
    for(let value of usuario.datos){
      let leng=JSON.stringify(value.lenguajes)
      console.log(leng)
      let array=leng.split(',')
      for(let val of array){
        console.log(val.replace(/[{}]/g,""))
      }
    }
  }
  getPrimerCommit(proyecto) {
    if (proyecto.commits.length>=1) {
      let tamano = proyecto.commits.length;
      this.UltimoCommit = proyecto.commits[tamano - 1].committed_date;
    } else {
      this.UltimoCommit = "no existe";
    }
  }
  getUltimoCommit(proyecto) {
    if (proyecto.commits.length>=1) {
      this.primerCommit = proyecto.commits[0].committed_date;

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
        console.log(result)
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
