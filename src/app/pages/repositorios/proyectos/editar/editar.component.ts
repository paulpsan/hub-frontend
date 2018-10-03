import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../services/service.index';

@Component({
  selector: 'hub-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  id: number;
  acciones: string;
  private prueba: string = 'prueba';
  private sub: any;
  private proyecto;
  showBasico: boolean = false;
  showLogo: boolean = false;
  showLicencias: boolean = false;
  projectForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.obtenerProyecto();
    this.projectForm = new FormGroup({
      nombre: new FormControl(),
      // logotipo: new FormControl(),
      descripcion: new FormControl(),
      // categorias: new FormControl(''),
      // usuarios: new FormControl(''),
      // grupo: new FormControl(''),
      path: new FormControl({ value: '', disabled: true }),
      // licencias :new FormControl(),

      // nombre: new FormControl('', Validators.required)
    });
  }
  obtenerProyecto() {
    this._httpService.buscarId('proyectos', this.id).subscribe(
      result => {
        console.log(result);
        this.proyecto = result;
        this.cargarDatos();
      }
    )
  }
  cargarDatos() {
    console.log(this.proyecto);
    this.projectForm.setValue({
      nombre: this.proyecto.nombre,
      descripcion: this.proyecto.descripcion,
      path: this.proyecto.path

      // licencias:this.proyecto.licencia
    });
  }
  onSubmit() {
    if (this.projectForm.valid) {
      // let user: Usuario = new Usuario(null,
      //   this.projectForm.controls['nombre'].value,
      //   this.projectForm.controls['email'].value,'','','','');
      // this.userService.adicionar(user).subscribe();

      // this.projectForm.reset();
      this.router.navigate(["/proyectos"]);
    }
  }
}
