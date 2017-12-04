import { Proyecto } from '../../../models/proyecto';
import { ResultFunc } from 'rxjs/observable/GenerateObservable';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hub-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  
  id: number;
  private sub:any;
  private proyecto:Proyecto;
  show : boolean = false;

  
  constructor(private route:ActivatedRoute,private router:Router,private _httpService:HttpService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id);
    this.obtenerProyecto();
  }
  obtenerProyecto(){
    this._httpService.buscarId('proyectos',this.id).subscribe(
      result=>{
        this.proyecto=result;
        this.show=true;
        console.log(this.proyecto);
      }
    )
  }
  editarProyecto(proyecto){
    if (proyecto) {
      this.router.navigate(['/proyectos/editar', proyecto.id]);
    } 
  }
}
