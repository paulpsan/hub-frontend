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
import { Subject } from "rxjs";

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
  clasificacion: number = 0;
  lenguajes = [];
  pieChartData;
  pieChartLabels;
  commitProyecto;
  commitlenguaje;
  primerCommit;
  UltimoCommit;
  data$;
  dataLenguajes$;
  usuarioProyecto;
  proyectoSelect;
  showUsuarios: boolean = false;
  showLenguajes: boolean = false;
  buttonClasi: boolean = true;
  show: boolean = false;
  starList: boolean[] = [true, true, true, true, true];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
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
    //set opciones del dataTable en español
    this.dtOptions = {
      order: [[0, "desc"]],
      pagingType: "full_numbers",
      pageLength: 10,
      language: {
        search: "Buscar",
        lengthMenu: "Mostrar _MENU_ entradas",
        info: "Mostrar Pagina _PAGE_ de _PAGES_",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Ultimo"
        }
      }
    };

    if (this.id) {
      //edit form
      this._httpService.buscarId("usuarios", this.id).subscribe(
        resp => {
          console.log(resp);
          this.id = resp._id;
          this.usuario = resp;
          this.data$ = resp.data;
          this.show = true;
          if (this.usuario.tipo == "gitlab") {
            this.calculaCommits(this.usuario);
            this.listaProyectos(this.usuario);
            this.getCommitUsuario("gitlab", this.id);
          } else {
            if (this.usuario.tipo == "github") {
              this.calculaCommits(this.usuario);
              this.listaProyectos(this.usuario);
              this.getLenguajes(this.usuario);
              this.getCommitUsuario("github", this.id);
            } else {
              if (this.usuario.tipo == "bitbucket") {
                for (let value of this.usuario.datos) {
                  this.commitsTotal += value.commits;
                }
                this.listaProyectos(this.usuario);
                // this.getLenguajes(this.usuario);
              }
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

  getCommitUsuario(url, id) {
    //enviar usuario y token
    let token = localStorage.getItem("token");
    this._httpService
      .post("usuarios/commits/" + id + "/" + url, { token: token })
      .subscribe(respuesta => {
        let arraySum = respuesta.barChartData[0].data;
        for (let i = 1; i < respuesta.barChartData.length; i++) {
          for (
            let index = 0;
            index < respuesta.barChartData[i].data.length;
            index++
          ) {
            arraySum[index] =
              arraySum[index] + respuesta.barChartData[i].data[index];
          }
        }
        console.log(arraySum);
        this.data$ = {
          lineChartData: arraySum.reverse(),
          lineChartLabels: respuesta.años
        };
      });
  }
  cargarLenguajes(lenguaje) {
    console.log(lenguaje);
    this.pieChartLabels = [];
    this.pieChartData = [];
    let arrarResp = [];
    let leng = JSON.stringify(lenguaje);
    let array = leng.split(",");
    let lengProyectos = [];
    for (let val of array) {
      let cadena = val.replace(/[{""}]/g, "").split(":");
      lengProyectos.push({ lenguaje: cadena[0], codigo: cadena[1] });
    }
    if (Object.keys(lengProyectos).length !== 0) {
      console.log(lengProyectos);
      arrarResp = lengProyectos;
      for (let value of arrarResp) {
        if (value.lenguaje != "" && value.codigo != undefined) {
          this.pieChartLabels.push(value.lenguaje);
          this.pieChartData.push(parseInt(value.codigo));
        } else {
          this.pieChartLabels.push("0");
          this.pieChartData.push(0);
        }
      }
    }
    console.log(this.pieChartLabels, this.pieChartData);
  }
  getUsuarios(proyecto, tipo) {
    this.showLenguajes = false;
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
        this.cargarLenguajes(proyecto.lenguajes);
        setTimeout(() => {
          this.showLenguajes = true;
        }, 1000);
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
        console.log(this.usuarioProyecto);
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
      this.primerCommit =
        proyecto.commits[tamano - 1].committed_date ||
        proyecto.commits[tamano - 1].commit.author.date;
    } else {
      this.primerCommit = "no existe";
    }
  }
  getUltimoCommit(proyecto) {
    if (proyecto.commits.length >= 1) {
      this.UltimoCommit =
        proyecto.commits[0].committed_date ||
        proyecto.commits[0].commit.author.date;
    } else {
      this.UltimoCommit = "no existe";
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
  //  Setea estrellas haciendo click
  setStar(data: any) {
    this.buttonClasi = false;
    // this.rating = data + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      } else {
        this.starList[i] = true;
      }
    }
    this.clasificacion = data + 1;
    console.log(data + 1);
  }
  guardarClasificacion() {
    this.buttonClasi = true;
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
