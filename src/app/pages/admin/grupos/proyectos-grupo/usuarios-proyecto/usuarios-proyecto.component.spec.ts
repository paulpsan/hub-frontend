import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosProyectoComponent } from './usuarios-proyecto.component';

describe('UsuariosProyectoComponent', () => {
  let component: UsuariosProyectoComponent;
  let fixture: ComponentFixture<UsuariosProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
