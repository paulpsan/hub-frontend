import {
  Component,
  OnInit,
} from "@angular/core";
import { Usuario } from "../../../models/usuario";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http/http.service";
import { Subject } from "rxjs";

@Component({
  selector: "hub-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.css"]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioComponent implements OnInit {
  private sub: any;
  commitsTotal: number = 0;
  clasificacion: number = 0;
  id: number;
  usuario;
  repositorios;
  token;
  lenguajes = [];
  pieChartData;
  pieChartLabels;
  primerCommit;
  UltimoCommit;
  data$;
  usuarioProyecto;
  proyectoSelect;
  showUsuario: boolean = false;
  showProyectos: boolean = false;
  showUsuarios: boolean = false;
  showLenguajes: boolean = false;
  buttonClasi: boolean = true;
  starList: boolean[] = [true, true, true, true, true];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
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
      this._httpService.buscarId("usuarios", this.id).subscribe(resp => {
        this.usuario = resp;
        this.showUsuario = true;

        this._httpService
          .obtener("repositorios/" + this.id + "/usuarios")
          .subscribe(resp => {
            console.log(resp);
            this.showProyectos = true;
            if (this.usuario.tipo != "local") {
              this.repositorios = resp;
              this.calculaCommits(this.usuario);
              this.getCommitUsuario(this.usuario.tipo, this.id);
            }
          });
      });
    }
  }

  //grafica de commits por usuario
  getCommitUsuario(url, id) {
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
  //Obtiene commits totales
  calculaCommits(repo) {
    for (let value of repo.datos) {
      this.commitsTotal += value.commits.length;
    }
  }
  //Proyecto seleccionado
  detalleProyecto(proyecto, tipo) {
    this.showLenguajes = false;
    this.proyectoSelect = proyecto;
    this.getPrimerCommit(proyecto);
    this.getUltimoCommit(proyecto);
    // this.dataLenguajes$ = proyecto.lenguajes;
    this.cargarLenguajes(proyecto.lenguajes, this.usuario.tipo);
    this.cargarUsuarios(proyecto, this.usuario.tipo);
    if (tipo == "gitlab") {
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
        // this.proyectoSelect = proyecto;
        //* obtenemos usuarios de los commits
      }
    }
  }
  //Calcula el primer commit del proyecto
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
  //Calcula el ultimo commit del proyecto
  getUltimoCommit(proyecto) {
    if (proyecto.commits.length >= 1) {
      this.UltimoCommit =
        proyecto.commits[0].committed_date ||
        proyecto.commits[0].commit.author.date;
    } else {
      this.UltimoCommit = "no existe";
    }
  }
  //Obtiene los lenguajes del proyecto
  cargarLenguajes(lenguajeUrl, tipo) {
    if (tipo === "github") {
      this._httpService
        .post("repositorios/lenguajes", {
          url: lenguajeUrl,
          tipo: "github",
          token: this.token
        })
        .subscribe(lenguaje => {
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
          // console.log(this.pieChartLabels, this.pieChartData);
          this.showLenguajes = true;
        });
    }
  }

  cargarUsuarios(proyecto, tipo) {
    if (tipo === "github") {
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
      //*
      this.showUsuarios = true;
    }
  }

  getLenguajes(usuario) {
    console.log(usuario);
    let lenguajes = [];
    for (const repo of usuario.datos) {
      if (usuario.tipo == "github") {
        let cadena = JSON.stringify(repo.lenguajes).split('"');
        for (let index = 0; index < cadena.length; index++) {
          if (index % 2 != 0) {
            if (lenguajes.indexOf(cadena[index]) == -1) {
              lenguajes.push(cadena[index]);
            }
          }
        }
      } else {
        lenguajes.push(repo.lenguajes);
      }
    }

    // let arrarResp = [];
    // for (let value of usuario.datos) {
    //   let leng = JSON.stringify(value.lenguajes);
    //   let array = leng.split(",");
    //   let lengProyectos = [];
    //   for (let val of array) {
    //     let cadena = val.replace(/[{""}]/g, "").split(":");
    //     lengProyectos.push({
    //       lenguaje: cadena[0],
    //       codigo: cadena[1]
    //     });
    //   }
    //   arrarResp.push(lengProyectos);
    // }
    // console.log(lenguajes);
    this.lenguajes = lenguajes;
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
 
}

