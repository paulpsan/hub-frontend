import { UsePipeTransformInterfaceRule } from 'codelyzer';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../../services/http.service";
import { Proyecto } from "../../../../models/proyecto";

@Component({
  selector: "hub-editar",
  templateUrl: "./editar.component.html",
  styleUrls: ["./editar.component.css"]
})
export class EditarComponent implements OnInit {
  id: number;
  acciones: string;
  private prueba:string='prueba';
  private sub: any;
  private proyecto:Proyecto;
  showBasico: boolean = false;
  showLogo: boolean = false;
  showLicencias: boolean = false;

  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.obtenerProyecto();
    this.userForm = new FormGroup({
      nombre:new FormControl(),
      direccion : new FormControl(''),
      descripcion :new FormControl(),
      logotipo :new FormControl(),
      // licencias :new FormControl(),

      // nombre: new FormControl('', Validators.required)
    }); 
  }
  obtenerProyecto(){
    this._httpService.buscarId('proyectos',this.id).subscribe(
      result=>{
        this.proyecto=result;
        this.cargarDatos();
      }
    )
  }
  cargarDatos(){
    console.log(this.proyecto);
    this.userForm.setValue({
      nombre:this.proyecto.nombre,
      direccion:this.proyecto.web_url,
      descripcion:this.proyecto.descripcion,
      logotipo:this.proyecto.icono,
      // licencias:this.proyecto.licencia
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      // let user: Usuario = new Usuario(null,
      //   this.userForm.controls['nombre'].value,
      //   this.userForm.controls['email'].value,'','','','');
      // this.userService.adicionar(user).subscribe();

      this.userForm.reset();
      this.router.navigate(["/proyectos"]);
    }
  }
  eliminarLicencia(){
    
  }
}
