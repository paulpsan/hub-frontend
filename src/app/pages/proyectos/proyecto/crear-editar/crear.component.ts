import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'hub-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  id: number;
  acciones:string;
  private sub:any;
 
  userForm: FormGroup;

  constructor(private route: ActivatedRoute,private router: Router,private _httpService:HttpService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      nombre: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    if (this.userForm.valid) {

        // let user: Usuario = new Usuario(null,
        //   this.userForm.controls['nombre'].value,
        //   this.userForm.controls['email'].value,'','','','');
        // this.userService.adicionar(user).subscribe();
 
      this.userForm.reset();
      this.router.navigate(['/proyectos']);
    }
  }
}
