import { Component, NgModule, OnInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// import {BrowserAnimationsModule} from '@angular/platform-browser-animations';
import { Usuario } from "../../../models/usuario";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http/http.service";
import { Subject } from "rxjs";
import * as moment from "moment";
import { resolve } from "dns";
import { environment } from "../../../../environments/environment";

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
  commitsRepoTotal;
  clasificacion = 0;
  id: number;
  usuario;
  repositorios;
  token;
  lenguajes = [];
  pieChartData = [];
  pieChartLabels = [];
  primerCommit;
  UltimoCommit;
  dataCalendar$;
  data$;
  dataRepo$;
  configRepo$;
  config$;
  usuarioRepositorio;
  repoSelect;
  proyectos;
  dominio;
  detalleProy = false
  detalleRepo = false;
  isPropietario = false;
  showUsuario = false;
  showUsuarios = false;
  showRepositorios = false;
  showCommits = false;
  showLenguajes = false;
  showCommitsRepo = false;
  buttonClasi = true;
  starList: boolean[] = [true, true, true, true, true];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  showYear = false;
  showMonth = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {
    this.dominio = environment.gitlabAdmin.domain;
  }

  ngOnInit() {
    moment.locale("es");
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
        this.isPropietario =
          this.usuario._id === JSON.parse(localStorage.getItem("usuario"))._id
            ? true
            : false;

        this._httpService
          .obtener("usuarios/" + this.id + "/proyectos")
          .subscribe(resp => {
            if (resp.length >= 1) {
              this.proyectos = resp;
              console.log(this.proyectos);
            }
          });

        this._httpService
          .obtener("repositorios/" + this.id + "/usuarios?visibilidad=true")
          .subscribe(async resp => {
            const objRepo = [];
            for (const repo of resp.datos) {
              if (repo.visibilidad) {
                this.showRepositorios = true;
                objRepo.push(repo);
              }
            }
            if (objRepo.length >= 1) {
              this.repositorios = objRepo;
            }
            console.log(this.repositorios);
            this.totalCommits();
            this.config$ = {
              legend: "Commits",
              xAxisLabel: "Fecha",
              yAxisLabel: "Commits",
              series: "total"
            };
            this.data$ = await this.renderGraph("user", this.usuario);
            console.log(this.data$);
            if (this.data$) {
              this.dataCalendar$ = this.data$.heatMap || "";
              this.showCommits = this.data$.total.length >= 2 ? true : false;
            }
          });
      });
    }
  }

  // Obtiene commits totales
  totalCommits() {
    this._httpService
      .obtener("commits/" + this.usuario._id + "/usuarios")
      .subscribe(resp => {
        this.commitsTotal = resp.total;
      });
  }
  // Repositorio seleccionado
  async detalleRepositorio(repositorio, tipo) {
    this.showCommitsRepo = false;
    this._httpService.obtener("repositorios" + repositorio._id);
    this._httpService
      .obtener("commits/" + repositorio._id)
      .subscribe(respCommits => {
        this.detalleProy = false;
        this.detalleRepo = true;
        this.commits = respCommits;
        this.showLenguajes = false;
        this.repoSelect = repositorio;
        this.commitsRepoTotal = this.commits.length;
        this.getPrimerCommit(this.commits);
        this.getUltimoCommit(this.commits);
        // this.dataLenguajes$ = repositorio.lenguajes;
        console.log(repositorio);
        this.cargarLenguajes(repositorio.lenguajes, this.usuario.tipo);
        this.cargarUsuarios(this.commits, this.usuario.tipo);
        this.showUsuarios = true;
      });
    this.configRepo$ = {
      legend: "Commits",
      xAxisLabel: "Fecha",
      yAxisLabel: "Commits",
      series: "total"
    };
    this.dataRepo$ = await this.renderGraph("repo", repositorio);
    this.showCommitsRepo = this.dataRepo$.total.length >= 2 ? true : false;

    this.showMonth = this.dataRepo$.mes.length >= 2 ? true : false;
    this.showYear = this.dataRepo$.años.length >= 2 ? true : false;
  }

  async detalleProyecto(proy) {
    console.log(proy);
    this.showCommitsRepo = false;
    this._httpService
      .obtener("commits/" + proy._id)
      .subscribe(respCommits => {
        this.detalleProy = true
        this.detalleRepo = false;
        console.log(respCommits);
        if (respCommits.length >= 1) {
          this.commits = respCommits;
          this.showLenguajes = false;
          this.repoSelect = proy;
          this.commitsRepoTotal = this.commits.length;
          this.getPrimerCommit(this.commits);
          this.getUltimoCommit(this.commits);
          if (proy.datos) {
            this.cargarLenguajes(proy.datos.lenguajes, this.usuario.tipo);
            this.showUsuarios = true;
          }
        }
      });

    this.configRepo$ = {
      legend: "Commits",
      xAxisLabel: "Fecha",
      yAxisLabel: "Commits",
      series: "total"
    };
    this.dataRepo$ = await this.renderGraph("repo", proy);
    console.log(this.dataRepo$);
    if (this.dataRepo$) {
      this.showCommitsRepo = this.dataRepo$.total.length >= 2 ? true : false;
      this.showMonth = this.dataRepo$.mes.length >= 2 ? true : false;
      this.showYear = this.dataRepo$.años.length >= 2 ? true : false;
    }
  }


  // Calcula el primer commit del repositorio
  getPrimerCommit(commits) {
    const tamano = commits.length;
    if (tamano >= 1) {
      this.primerCommit = commits[tamano - 1].fecha;
    } else {
      this.primerCommit = "no existe";
    }
  }
  // Calcula el ultimo commit del repositorio
  getUltimoCommit(commits) {
    if (commits.length >= 1) {
      this.UltimoCommit = commits[0].fecha;
    } else {
      this.UltimoCommit = "no existe";
    }
  }

  // Obtiene los lenguajes del repositorio
  cargarLenguajes(dataLenguaje, tipo) {
    console.log(dataLenguaje.datos);
    setTimeout(() => {
      const lenguaje = dataLenguaje.datos;
      this.pieChartLabels = [];
      this.pieChartData = [];
      if (typeof lenguaje == "object") {
        const leng = JSON.stringify(lenguaje);
        const array = leng.split(",");
        const lengRepositorios = [];
        for (const val of array) {
          const cadena = val.replace(/[{""}]/g, "").split(":");
          lengRepositorios.push({ lenguaje: cadena[0], codigo: cadena[1] });
        }
        if (Object.keys(lengRepositorios).length !== 0) {
          for (const value of lengRepositorios) {
            if (value.lenguaje !== "" && value.codigo !== undefined) {
              this.pieChartLabels.push(value.lenguaje);
              this.pieChartData.push(value.codigo);
            } else {
              this.pieChartLabels.push("0");
              this.pieChartData.push(0);
            }
          }
          this.showLenguajes = true;
        }
      } else {
        console.log(lenguaje);
        if (typeof lenguaje == "string" && lenguaje !== "") {
          this.pieChartLabels.push(lenguaje);
          this.pieChartData.push(100);
          this.showLenguajes = true;
        } else {
          this.showLenguajes = false;
        }
      }
    }, 200);
  }

  cargarUsuarios(commits, tipo) {
    let datos = [];
    for (const commit of commits) {
      datos.push({
        autor: commit.autor,
        avatar_autor: commit.avatar_autor || "",
        web_url_autor: commit.web_url_autor || ""
      });
    }
    const hash = {};
    // elimina repetidos
    datos = datos.filter(function (current) {
      const exists = !hash[current.name] || false;
      hash[current.name] = true;
      return exists;
    });
    this.usuarioRepositorio = datos;
    this.showUsuarios = true;
  }

  editarUsuario(usuario: Usuario) {
    if (usuario) {
      this.router.navigate(["/usuarios/editar", usuario._id]);
    }
  }
  //  Setea estrellas haciendo click
  setStar(data: any) {
    this.buttonClasi = false;
    // this.rating = data + 1;
    for (let i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      } else {
        this.starList[i] = true;
      }
    }
    this.clasificacion = data + 1;
  }

  guardarClasificacion() {
    this.buttonClasi = true;
  }

  getDataGraph(tipo: string, data) {
    return new Promise((resolve, reject) => {
      let url = {
        user: "/usuarios/graficos",
        repo: "/repositorio/graficos"
      };
      this._httpService.obtener("commits/" + data._id + url[tipo]).subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  async renderGraph(tipo: string, data) {
    let series = await this.getDataGraph(tipo, data)
      .then((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
    return series;
  }

  changeGraph(config, serie) {
    let objectConfig = {
      legend: "Commits",
      xAxisLabel: "Fecha",
      yAxisLabel: "Commits",
      series: serie
    };
    config == "config"
      ? (this.config$ = objectConfig)
      : (this.configRepo$ = objectConfig);
  }
}
