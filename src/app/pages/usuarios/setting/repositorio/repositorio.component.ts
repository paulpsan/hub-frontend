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
import { HttpService } from "../../../../services/http/http.service";
import { slideInDownAnimation } from "../../../../animations";
import { Usuario } from "../../../../models/usuario";
import { UsuarioService } from "../../../../services/usuario/usuario.service";
import { Subject } from "rxjs";
import { SubirArchivoService } from "../../../../services/service.index";
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
  cuentas = [];
  userForm: FormGroup;
  addForm: FormGroup;
  show: boolean = true;
  showAdd: boolean = false;
  showRepo: boolean = false;
  usuario;
  @Output() siguiente = new EventEmitter<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  imagenSubir: File;
  imagenTemp: string;
  urlImg;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private _subirArchivoService: SubirArchivoService
  ) {}

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
      if (this.usuario.github) this.cuentas.push("github");
      if (this.usuario.gitlab) this.cuentas.push("gitlab");
      if (this.usuario.bitbucket) this.cuentas.push("bitbucket");
    });
    console.log(this.usuario);
    this.urlImg = GLOBAL.url;

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
  seleccionImage(archivo: File) {
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
          .subscribe();
        if (this.repositorios[key].visibilidad) {
          this._httpService
            .post("commits", this.repositorios[key])
            .subscribe(response => {
              console.log(response);
            });
        } else {
          this._httpService
            .editar("commits", this.repositorios[key])
            .subscribe();
        }
        //set issues, downloads,forks,stars,
        console.log("object");
        this._httpService
          .post("repositorios/datos", this.repositorios[key])
          .subscribe();
      }
    }
    this.repoCopy = JSON.parse(JSON.stringify(this.repositorios));
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
}
