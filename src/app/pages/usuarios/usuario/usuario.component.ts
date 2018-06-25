import { Component, OnInit } from "@angular/core";
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
  commits;
  commitsTotal;
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
  usuarioRepositorio;
  repoSelect;
  showUsuario: boolean = false;
  showRepositorios: boolean = false;
  showUsuarios: boolean = false;
  showLenguajes: boolean = false;
  buttonClasi: boolean = true;
  starList: boolean[] = [true, true, true, true, true];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
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
            let objRepo = [];
            for (const repo of resp.datos) {
              if (repo.visibilidad) {
                this.showRepositorios = true;
                objRepo.push(repo);
              }
            }
            this.repositorios = objRepo;
            console.log(this.repositorios);
            this.totalCommits();
            this.getCommitUsuario(this.usuario.tipo, this.id);
            // if (this.usuario.tipo != "local") {
            //   // this.calculaCommits(this.usuario);
            //   // this.getCommitUsuario(this.usuario.tipo, this.id);
            // }
          });
      });
    }
  }

  //grafica de commits por usuario
  getCommitUsuario(url, id) {
    let token = localStorage.getItem("token");
    this._httpService
      .post("commits/" + id + "/usuarios/graficos", { token: token })
      .subscribe(respuesta => {
        // let arraySum = respuesta.barChartData[0].data;
        // for (let i = 1; i < respuesta.barChartData.length; i++) {
        //   for (
        //     let index = 0;
        //     index < respuesta.barChartData[i].data.length;
        //     index++
        //   ) {
        //     arraySum[index] =
        //       arraySum[index] + respuesta.barChartData[i].data[index];
        //   }
        // }
        // console.log(arraySum);
        this.data$ = {
          lineChartData: respuesta.barChartData[0].data,
          lineChartLabels: respuesta.años
        };
      });
  }
  //Obtiene commits totales
  totalCommits() {
    this._httpService
      .obtener("commits/" + this.usuario._id + "/usuarios")
      .subscribe(resp => {
        this.commitsTotal = resp.total;
      });
  }
  //Repositorio seleccionado
  detalleRepositorio(repositorio, tipo) {
    console.log(repositorio);
    this._httpService
      .obtener("commits/" + repositorio._id)
      .subscribe(respCommits => {
        this.commits = respCommits;
        console.log(this.commits);
        this.showLenguajes = false;
        this.repoSelect = repositorio;

        this.getPrimerCommit(this.commits);
        this.getUltimoCommit(this.commits);
        // this.dataLenguajes$ = repositorio.lenguajes;
        this.cargarLenguajes(repositorio.lenguajes, this.usuario.tipo);
        this.cargarUsuarios(this.commits, this.usuario.tipo);
        this.showUsuarios = true;
      });
  }
  //Calcula el primer commit del repositorio
  getPrimerCommit(commits) {
    let tamano = commits.length;
    if (tamano >= 1) {
      this.primerCommit = commits[tamano - 1].fecha;
    } else {
      this.primerCommit = "no existe";
    }
  }
  //Calcula el ultimo commit del repositorio
  getUltimoCommit(commits) {
    if (commits.length >= 1) {
      this.UltimoCommit = commits[0].fecha;
    } else {
      this.UltimoCommit = "no existe";
    }
  }
  //Obtiene los lenguajes del repositorio
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
          let lengRepositorios = [];
          for (let val of array) {
            let cadena = val.replace(/[{""}]/g, "").split(":");
            lengRepositorios.push({ lenguaje: cadena[0], codigo: cadena[1] });
          }
          if (Object.keys(lengRepositorios).length !== 0) {
            arrarResp = lengRepositorios;
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

  cargarUsuarios(commits, tipo) {
    let datos = [];
    for (let commit of commits) {
      datos.push({
        autor: commit.autor,
        avatar_autor: commit.avatar_autor || "",
        web_url_autor: commit.web_url_autor || ""
      });
    }
    var hash = {};
    // elimina repetidos
    datos = datos.filter(function(current) {
      var exists = !hash[current.name] || false;
      hash[current.name] = true;
      return exists;
    });
    this.usuarioRepositorio = datos;
    //*
    this.showUsuarios = true;
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
    //   let lengRepositorios = [];
    //   for (let val of array) {
    //     let cadena = val.replace(/[{""}]/g, "").split(":");
    //     lengRepositorios.push({
    //       lenguaje: cadena[0],
    //       codigo: cadena[1]
    //     });
    //   }
    //   arrarResp.push(lengRepositorios);
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
