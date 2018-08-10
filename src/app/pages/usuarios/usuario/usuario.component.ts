import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {BrowserAnimationsModule} from '@angular/platform-browser-animations';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../services/http/http.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { resolve } from 'dns';

@Component({
  selector: 'hub-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
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
  pieChartData;
  pieChartLabels;
  primerCommit;
  UltimoCommit;
  data$;
  dataRepo$;
  configRepo$;
  config$;
  usuarioRepositorio;
  repoSelect;
  isPropietario = false;
  showUsuario = false;
  showRepositorios = false;
  showUsuarios = false;
  showLenguajes = false;
  buttonClasi = true;
  starList: boolean[] = [true, true, true, true, true];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    moment.locale('es');
    this.token = localStorage.getItem('token');
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.dtOptions = {
      order: [[0, 'desc']],
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        search: 'Buscar',
        lengthMenu: 'Mostrar _MENU_ entradas',
        info: 'Mostrar Pagina _PAGE_ de _PAGES_',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Ultimo'
        }
      }
    };

    if (this.id) {
      this._httpService.buscarId('usuarios', this.id).subscribe(resp => {
        this.usuario = resp;
        this.showUsuario = true;
        this.isPropietario = this.usuario._id === JSON.parse(localStorage.getItem('usuario'))._id ? true : false;
        this.renderGraph('usuario', this.usuario, this.data$);

        this._httpService
          .obtener('repositorios/' + this.id + '/usuarios')
          .subscribe(resp => {
            const objRepo = [];
            for (const repo of resp.datos) {
              if (repo.visibilidad) {
                this.showRepositorios = true;
                objRepo.push(repo);
              }
            }
            this.repositorios = objRepo;
            if (this.repositorios.length >= 1) {
              this.totalCommits();
              this.getCommitUsuario(this.id);
            }
            // if (this.usuario.tipo != "local") {
            //   // this.calculaCommits(this.usuario);
            //   // this.getCommitUsuario(this.usuario.tipo, this.id);
            // }
          });
      });
    }
  }

  // grafica de commits por usuario
  getCommitUsuario(id) {
    this._httpService
      .obtener('commits/' + id + '/usuarios/graficos')
      .subscribe(respuesta => {
        const series = [];
        let max = 0;
        let min = 100;
        for (const data of respuesta.mes) {
          series.push({
            name: moment(data.date).format('YYYY MMM'),
            value: data.total
          });
          if (max <= data.total) {
            max = data.total;
          }
          if (data.total <= min) {
            min = data.total;
          }
        }
        max = max + max * 0.1;
        min = min - min * 0.1;

        this.configRepo$ = {
          legend: 'Commit Total',
          xAxisLabel: 'Fecha',
          yAxisLabel: 'Commits',
          yScaleMin: min,
          yScaleMax: max
        };
        this.data$ = series;

        // var lineChartLabels = [];
        // var lineChartData = [];
        // console.log(respuesta.años.años.length);
        // if (respuesta.años.años.length <= 3) {
        //   console.log(respuesta.mes);
        //   for (const data of respuesta.mes) {
        //     lineChartData.push(data.total);
        //     lineChartLabels.push(data.mes);
        //   }

        //   this.data$ = { lineChartData, lineChartLabels };
        //   console.log(this.data$);
        // } else {
        //   this.data$ = {
        //     lineChartData: respuesta.años.barChartData[0].data,
        //     lineChartLabels: respuesta.años.años
        //   };
        // }
      });
  }
  // Obtiene commits totales
  totalCommits() {
    this._httpService
      .obtener('commits/' + this.usuario._id + '/usuarios')
      .subscribe(resp => {
        this.commitsTotal = resp.total;
      });
  }
  // Repositorio seleccionado
  detalleRepositorio(repositorio, tipo) {
    this._httpService
      .obtener('commits/' + repositorio._id)
      .subscribe(respCommits => {
        this.commits = respCommits;
        this.showLenguajes = false;
        this.repoSelect = repositorio;
        this.commitsRepoTotal = this.commits.length;
        this.getPrimerCommit(this.commits);
        this.getUltimoCommit(this.commits);
        // this.dataLenguajes$ = repositorio.lenguajes;
        this.cargarLenguajes(repositorio.lenguajes, this.usuario.tipo);
        this.cargarUsuarios(this.commits, this.usuario.tipo);
        this.showUsuarios = true;
      });
    this._httpService
      .obtener('commits/' + repositorio._id + '/repositorio/graficos')
      .subscribe(resp => {
        const series = [];
        let max = 0;
        let min = 100;
        for (const data of resp.mes) {
          series.push({
            name: moment(data.date).format('YYYY MMM'),
            value: data.total
          });
          if (max <= data.total) {
            max = data.total;
          }
          if (data.total <= min) {
            min = data.total;
          }
        }
        // colocar el config para datos
        max = max + max * 0.1;
        min = min - min * 0.1;
        this.config$ = {
          legend: repositorio.nombre,
          xAxisLabel: 'Fecha',
          yAxisLabel: 'Commits',
          yScaleMin: min,
          yScaleMax: max
        };
        this.dataRepo$ = series;
      });
  }
  // Calcula el primer commit del repositorio
  getPrimerCommit(commits) {
    const tamano = commits.length;
    if (tamano >= 1) {
      this.primerCommit = commits[tamano - 1].fecha;
    } else {
      this.primerCommit = 'no existe';
    }
  }
  // Calcula el ultimo commit del repositorio
  getUltimoCommit(commits) {
    if (commits.length >= 1) {
      this.UltimoCommit = commits[0].fecha;
    } else {
      this.UltimoCommit = 'no existe';
    }
  }

  // Obtiene los lenguajes del repositorio
  cargarLenguajes(dataLenguaje, tipo) {
    setTimeout(() => {
      const lenguaje = dataLenguaje.datos;
      if (this.usuario) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        const leng = JSON.stringify(lenguaje);
        const array = leng.split(',');
        const lengRepositorios = [];
        for (const val of array) {
          const cadena = val.replace(/[{""}]/g, '').split(':');
          lengRepositorios.push({ lenguaje: cadena[0], codigo: cadena[1] });
        }
        if (Object.keys(lengRepositorios).length !== 0) {
          for (const value of lengRepositorios) {
            if (value.lenguaje !== '' && value.codigo !== undefined) {
              this.pieChartLabels.push(value.lenguaje);
              this.pieChartData.push(value.codigo);
            } else {
              this.pieChartLabels.push('0');
              this.pieChartData.push(0);
            }
          }
        }
        this.showLenguajes = true;
      }
    }, 200);
  }

  cargarUsuarios(commits, tipo) {
    let datos = [];
    for (const commit of commits) {
      datos.push({
        autor: commit.autor,
        avatar_autor: commit.avatar_autor || '',
        web_url_autor: commit.web_url_autor || ''
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
      this.router.navigate(['/usuarios/editar', usuario._id]);
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
      switch (tipo) {
        case 'usuario':
          this._httpService
            .obtener('commits/' + data._id + '/usuarios/graficos')
            .subscribe(resp => {
              resolve(resp);
            }, err => {
              reject(err);
            });
          break;
        case 'repositorio':
          this._httpService
            .obtener('commits/' + data._id + '/repositorio/graficos')
            .subscribe(resp => {
              resolve(resp);
            }, err => {
              reject(err);
            });
          break;
      }
    });
  }

  renderGraph(tipo: string, data, dataOuput) {
    this.getDataGraph(tipo, data).then((resp: any) => {
      console.log(resp);
      const series = [];
      let max = 0;
      let min = 100;
      for (const data of resp.mes) {
        series.push({
          name: moment(data.date).format('YYYY MMM'),
          value: data.total
        });
        if (max <= data.total) {
          max = data.total;
        }
        if (data.total <= min) {
          min = data.total;
        }
      }
    }).catch(err => {
      console.log(err);
    });




    // switch (tipo) {
    //   case 'usuario':
    //     this._httpService
    //       .obtener('commits/' + data.id + '/usuarios/graficos')
    //       .subscribe(resp => {
    //         const series = [];
    //         let max = 0;
    //         let min = 100;
    //         for (const data of resp.mes) {
    //           series.push({
    //             name: moment(data.date).format('YYYY MMM'),
    //             value: data.total
    //           });
    //           if (max <= data.total) {
    //             max = data.total;
    //           }
    //           if (data.total <= min) {
    //             min = data.total;
    //           }
    //         }
    //         // colocar el config para datos
    //         max = max + max * 0.1;
    //         min = min - min * 0.1;
    //         this.config$ = {
    //           legend: data.nombre,
    //           xAxisLabel: 'Fecha',
    //           yAxisLabel: 'Commits',
    //           yScaleMin: min,
    //           yScaleMax: max
    //         };
    //         this.dataRepo$ = series;
    //       });
    //     break;
    //   case 'repositorio':
    //     this._httpService
    //       .obtener('commits/' + data.id + '/repositorio/graficos')
    //       .subscribe(resp => {
    //         const series = [];
    //         let max = 0;
    //         let min = 100;
    //         for (const data of resp.mes) {
    //           series.push({
    //             name: moment(data.date).format('YYYY MMM'),
    //             value: data.total
    //           });
    //           if (max <= data.total) {
    //             max = data.total;
    //           }
    //           if (data.total <= min) {
    //             min = data.total;
    //           }
    //         }
    //         // colocar el config para datos
    //         max = max + max * 0.1;
    //         min = min - min * 0.1;
    //         this.config$ = {
    //           legend: data.nombre,
    //           xAxisLabel: 'Fecha',
    //           yAxisLabel: 'Commits',
    //           yScaleMin: min,
    //           yScaleMax: max
    //         };
    //         this.dataRepo$ = series;
    //       });
    //     break;

    //   default:
    //     break;
    // }
  }

}
