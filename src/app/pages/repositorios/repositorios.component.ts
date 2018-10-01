import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GLOBAL } from "../../services/global";
import { environment } from "../../../environments/environment";
import { HttpService } from "../../services/http/http.service";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { Subject } from "rxjs";
import {
  SubirArchivoService,
  LoadDataService,
  MessageDataService
} from "../../services/service.index";
import { DataTableDirective } from "angular-datatables";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../shared/snackbar/snackbar.component";

@Component({
  selector: "hub-repositorios",
  templateUrl: "./repositorios.component.html",
  styleUrls: ["./repositorios.component.css"]
})
export class RepositoriosComponent implements AfterViewInit, OnDestroy, OnInit {
  id: number;
  acciones: string;
  repositorios;
  repoCopy;
  dataLoading;
  cuentas = [];
  userForm: FormGroup;
  addForm: FormGroup;
  show: boolean = true;
  showData: boolean = true;
  showAdd: boolean = false;
  showRepo: boolean = false;
  checked: boolean = false;
  usuario;
  datos: boolean = false;
  commits: boolean = false;
  grupos;
  proyectos;
  dominio;
  permisosProyecto = [
    { nombre: "privado", value: "private" },
    { nombre: "interno", value: "internal" },
    { nombre: "publico", value: "public" }
  ];
  @Output()
  siguiente = new EventEmitter<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  imagenSubir: File;
  imagenTemp;
  urlImg;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private _subirArchivoService: SubirArchivoService,
    private _loadDataService: LoadDataService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {
    this.dominio = environment.gitlabAdmin.domain;

    this.dataLoading = {
      content: "Cargando los datos del Usuario..............",
      type: "info"
    };
  }

  ngOnInit() {
    this._loadDataService.loadData$.subscribe(resp => {
      if (resp) {
        this.showData = false;
        this._usuarioService.usuario$.subscribe(repUsuario => {
          this.usuario = repUsuario;
          this.grupos = this.usuario.Grupos;
          this.proyectos = this.usuario.Proyectos;
          console.log(this.usuario);
          if (this.usuario.github) this.cuentas.push("github");
          if (this.usuario.gitlab) this.cuentas.push("gitlab");
          if (this.usuario.bitbucket) this.cuentas.push("bitbucket");
        });
        this.urlImg = environment.url;
        this.id = this.usuario._id;
        this.userForm = new FormGroup({
          nombre: new FormControl("", Validators.required),
          email: new FormControl("", [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
          ]),
          avatar: new FormControl(""),
          descripcion: new FormControl("", Validators.required),
          url: new FormControl("", Validators.required),
          password: new FormControl("", Validators.required)
        });
        if (this.id) {
          //edit form
          this.getRepositorios();
        }
      }
    });
    // this.getProyectos();
  }
  getProyectos() {
    this._httpService
      .obtener(`usuarios/${this.id}/proyectos`)
      .subscribe(resp => {
        if (resp.length >= 1) {
          this.proyectos = resp;

          // this.proyectos = this.proyectos.map(proy => {
          //   proy.path = proy.urlRepositorio.split('/')[3]
          //   return proy
          // })
          console.log(this.proyectos);
        }
      });
  }


  next(object) {
    this.siguiente.emit(object);
  }
  getRepositorios() {
    GLOBAL.dtOptions.order = [[3, "asc"]];
    this.dtOptions = GLOBAL.dtOptions;
    // this.repositorios = [];
    this._httpService
      .obtener("repositorios/" + this.id + "/usuarios")
      .subscribe(
        repositorios => {
          this.repositorios = repositorios.datos;
          this.repoCopy = JSON.parse(JSON.stringify(repositorios.datos));
          this.showRepo = this.repositorios.length !== 0 ? true : false;
          this.repositorios.map(repositorio => {
            return (repositorio.request = "");
          });

          // this.id = usuario._id;
          // this.userForm.patchValue({
          //   nombre: usuario.nombre,
          //   email: usuario.email,
          //   password: usuario.password,
          //   descripcion: usuario.descripcion,
          //   avatar: usuario.avatar,
          //   url: usuario.url
          // });
        },
        error => {
          console.log(error);
        }
      );
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      console.log(dtInstance);
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  selectImage(archivo: File) {
    console.log(this.imagenTemp, this.usuario);
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf("image") < 0) {
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }

  adicionarRepo() {
    this.showAdd = true;

    this.addForm = new FormGroup({
      nombreRepo: new FormControl("", Validators.required),
      avatarRepo: new FormControl(""),
      descripcionRepo: new FormControl("", Validators.required),
      urlRepo: new FormControl("", Validators.required),
      datePri: new FormControl(""),
      dateUlt: new FormControl("")
    });
  }

  // guardarRepo() {
  //   let repositorio = {
  //     nombre: this.addForm.controls["nombre"].value,
  //     urlRepo: this.addForm.controls["urlRepo"].value,
  //     descripcion: this.addForm.controls["descripcion"].value
  //   };
  //   this.showAdd = false;
  // }

  onSubmit() {
    if (this.addForm.valid) {
      let repositorio = {
        nombre: this.addForm.controls["nombreRepo"].value,
        urlRepo: this.addForm.controls["urlRepo"].value,
        descripcion: this.addForm.controls["descripcionRepo"].value,
        fk_usuario: this.id
      };

      this._httpService
        .adicionar("repositorios", repositorio)
        .subscribe(repo => {
          if (this.imagenSubir) {
            this._subirArchivoService
              .subirArchivo(this.imagenSubir, "repositorios", repo._id)
              .then((resp: any) => {
                // this.repositorios.avatar = resp.repositorios.avatar;
                repo.avatar = resp.repositorio.avatar;
                this._httpService.editar("repositorios", repo).subscribe();
              });
          }
        });
      this.showAdd = false;
    }
  }

  changeVisibility(project) {
    project.visibilidad = !project.visibilidad;
  }
  changeAll(event) {
    console.log(event);
    this.checked = !this.checked;
  }
  changeRow(event, project) {
    this.datos = false;
    this.commits = false;

    project.visibilidad = event.checked;
    project.request = "start";
    console.log(project);
    this._httpService.editar("repositorios", project).subscribe((repo: any) => {
      this._httpService.post("commits", project).subscribe(response => {
        console.log(response);
        this.commits = true;
        project.request = this.datos ? "finish" : "start";
        setTimeout(() => {
          project.request = "";
        }, 5000);
      });
    });
    if (project.visibilidad == true) {
      this._httpService.post("repositorios/datos", project).subscribe(resp => {
        this.datos = true;
        project.request = this.commits ? "finish" : "start";
        setTimeout(() => {
          project.request = "";
        }, 5000);
      });
    }
  }

  showAll() {
    for (const repo of this.repositorios) {
      repo.visibilidad = true;
    }
  }
  hideAll() {
    for (const repo of this.repositorios) {
      repo.visibilidad = false;
    }
  }
  //login gitlab
  login(auth) {
    localStorage.setItem("action", "refresh");
    switch (auth) {
      case "github":
        localStorage.setItem("type", "github");
        window.location.href =
          environment.github.domain +
          environment.github.clientId +
          "&state=" +
          environment.github.state;
        break;
      case "gitlab":
        localStorage.setItem("type", "gitlab");
        console.log(environment[this.usuario.cuentas[0]]);
        if (this.usuario.cuentas.indexOf("gitlab") >= 0) {
          window.location.href =
            environment.gitlab.domain +
            environment.gitlab.clientId +
            "&redirect_uri=" +
            environment.gitlab.callbackURL +
            "&response_type=code" +
            "&state=" +
            environment.gitlab.state;
        } else {
          window.location.href =
            environment.gitlabGeo.domain +
            environment.gitlabGeo.clientId +
            "&redirect_uri=" +
            environment.gitlabGeo.callbackURL +
            "&response_type=code" +
            "&state=" +
            environment.gitlabGeo.state;
        }
        break;
      case "bitbucket":
        localStorage.setItem("type", "bitbucket");
        window.location.href =
          environment.bitbucket.domain +
          environment.bitbucket.clientId +
          "&redirect_uri=" +
          environment.bitbucket.callbackURL +
          "&response_type=code" +
          "&state=" +
          environment.bitbucket.state;
        break;
      default:
        break;
    }
  }
  guardar(proyecto) {
    console.log(proyecto);
    proyecto.request = "start";
    proyecto.change = false;
    let url =
      proyecto.Grupos.length >= 1
        ? `grupos/${proyecto.Grupos[0]._id}/proyectos`
        : `proyectos`;

    this._httpService.editar(url, proyecto).subscribe(
      result => {
        console.log(result);
        proyecto.request = "ok";
        this.getProyectos();
      },
      err => {
        console.log(err);
        proyecto.request = "error";
        console.log(err);
        const objMessage = {
          text: err.error.message,
          type: "Info"
        };
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: "background-warning",
          duration: 5000
        });
        this.getProyectos();
      }
    );
  }
  eliminar(proyecto) {
    if (confirm("Esta seguro de eliminar el Proyecto: " + proyecto.nombre)) {
      console.log(proyecto);
      proyecto.request = "start";
      proyecto.change = false;

      let url =
        proyecto.Grupos.length >= 1
          ? `grupos/${proyecto.Grupos[0]._id}/proyectos`
          : `proyectos`;
      console.log(url);
      this._httpService.eliminarId(url, proyecto._id).subscribe(
        result => {
          console.log(result);
          proyecto.request = "ok";
          this.getProyectos();
        },
        err => {
          console.log(err);
          proyecto.request = "error";
          const objMessage = {
            text: err.error.message,
            type: "Info"
          };
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: "background-warning",
            duration: 5000
          });
          this.getProyectos();
        }
      );
    }
  }
}
