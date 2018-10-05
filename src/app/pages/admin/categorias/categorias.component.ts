import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService, MessageDataService } from '../../../services/service.index';
import { MatSnackBar, PageEvent } from '@angular/material';
import { SnackbarComponent } from '../../../shared/snackbar/snackbar.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'hub-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias;
  public respuesta: any;
  public buscar = "";
  public ordenar;
  public pagina = 1;
  public limite = 10;
  public total;
  public categoriaSelect
  public pageSizeOptions = [5, 10, 25, 100];
  public pageEvent: PageEvent;
  public edit: boolean = false;
  public new: boolean = true;
  categoriaForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) { }

  ngOnInit() {
    this.categoriaForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required)
    });
    this.obtenerDatos()
  }
  onSubmit() {
    let data = {
      nombre: this.categoriaForm.controls["nombre"].value,
      descripcion: this.categoriaForm.controls["descripcion"].value,
    }

    this._httpService.post(`categorias`, data).subscribe(
      resp => {
        const objMessage = {
          text: "Se adiciono exitosamente",
          type: "Info"
        };
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: "background-success",
          duration: 5000
        });
        this.obtenerDatos()
        this.categoriaForm.reset();
      },
      err => {
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
        this.categoriaForm.reset();
      }
    );


  }

  editar(categoria) {
    this.categoriaSelect = categoria;
    this.edit = true;
    this.new = false;
    this.categoriaForm.setValue({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    })
  }

  obtenerDatos(event?: PageEvent) {
    let pagData;
    if (event == null) {
      pagData = {
        ordenar: "nombre",
        pagina: 1,
        limite: 10
      };
    } else {
      pagData = {
        ordenar: "nombre",
        pagina: event.pageIndex + 1,
        limite: event.pageSize
      };
    }
    if (this.buscar != "") {
      pagData.buscar = this.buscar;
    }
    this._httpService.obtenerPaginado("categorias", pagData).subscribe(
      result => {
        this.respuesta = result;
        this.total = this.respuesta.paginacion.total;
        this.pagina = this.respuesta.paginacion.paginaActual - 1;
        this.limite = this.respuesta.paginacion.limite;
        this.categorias = this.respuesta.datos;
      },
      err => {
        console.log(err);
      }
    );
  }

  save() {
    console.log(this.categoriaSelect);
    let data = {
      nombre: this.categoriaForm.controls["nombre"].value,
      descripcion: this.categoriaForm.controls["descripcion"].value,
    }
    this.categoriaSelect.request = "start";
    this.categoriaSelect.change = false;
    this._httpService
      .patch(`categorias`, this.categoriaSelect._id, data)
      .subscribe(
        result => {
          this.categoriaSelect.request = "ok";
          this.categoriaSelect = undefined
          this.categoriaForm.reset();
          this.edit = false;
          this.new = true;
          this.obtenerDatos()
          console.log(result);
        },
        err => {
          console.log(err);
          this.categoriaSelect.request = "error";
        }
      );
  }

  eliminar(categoria) {
    if (confirm("Esta seguro de eliminar al categoria: " + categoria.nombre)) {
      categoria.request = "start";
      categoria.change = false;
      this._httpService
        .delete(`categorias/${categoria._id}`)
        .subscribe(
          result => {
            categoria.request = "ok";
            this.categoriaForm.reset();
            this.obtenerDatos()
          },
          err => {
            console.log(err);
            categoria.request = "error";
          }
        );
    }
  }
}
