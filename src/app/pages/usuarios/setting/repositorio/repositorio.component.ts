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
import { GLOBAL } from "../../../../services/global";
import { environment } from "../../../../../environments/environment";
import { HttpService } from "../../../../services/http/http.service";
import { UsuarioService } from "../../../../services/usuario/usuario.service";
import { Subject } from "rxjs";
import { SubirArchivoService, LoadDataService } from "../../../../services/service.index";
import { DataTableDirective } from "angular-datatables";

@Component({
  selector: "hub-repositorio",
  templateUrl: "./repositorio.component.html",
  styleUrls: ["./repositorio.component.css"]
})
export class RepositorioComponent implements AfterViewInit, OnDestroy, OnInit {
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
  usuario;
  @Output() siguiente = new EventEmitter<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
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
  ) {
    this.dataLoading = {
      content: 'Cargando los datos del Usuario..............',
      type: 'info'
    }
  }

  ngOnInit() {
    this._loadDataService.loadData$.subscribe(resp => {
      console.log(resp);
      if (resp) {
        this.showData = false;
        this._usuarioService.usuario$.subscribe(repUsuario => {
          this.usuario = repUsuario;
          if (this.usuario.github) this.cuentas.push("github");
          if (this.usuario.gitlab) this.cuentas.push("gitlab");
          if (this.usuario.bitbucket) this.cuentas.push("bitbucket");
        });
        console.log(this.usuario);
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
    })
  }
  next(object) {
    this.siguiente.emit(object);
  }
  getRepositorios() {
    GLOBAL.dtOptions.order = [[3, "asc"]];
    this.dtOptions = GLOBAL.dtOptions;
    // this.repositorios = [];
    console.log(this.dtOptions);
    this._httpService
      .obtener("repositorios/" + this.id + "/usuarios")
      .subscribe(
        repositorios => {
          this.repositorios = repositorios.datos;
          this.repoCopy = JSON.parse(JSON.stringify(repositorios.datos));
          this.showRepo = this.repositorios.length !== 0 ? true : false;
          console.log(this.repositorios, this.showRepo);
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

  save() {

    for (const key in this.repositorios) {
      if (
        this.repositorios[key].visibilidad != this.repoCopy[key].visibilidad
      ) {
        this._httpService
          .editar("repositorios", this.repositorios[key])
          .subscribe((repo: any) => {
            this._httpService
              .post("commits", this.repositorios[key])
              .subscribe(response => {
                console.log(response);
              });
          });
        if (this.repositorios[key].visibilidad == true) {
          //set issues, downloads,forks,stars,
          this._httpService
            .post("repositorios/datos", this.repositorios[key])
            .subscribe();
        }
      }
    }
    this.repoCopy = JSON.parse(JSON.stringify(this.repositorios));
  }

  changeVisibility(project) {
    project.visibilidad = !project.visibilidad

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
}
