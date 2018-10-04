import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProyectosGrupoComponent } from './admin-proyectos-grupo.component';

describe('ProyectosGrupoComponent', () => {
  let component: AdminProyectosGrupoComponent;
  let fixture: ComponentFixture<AdminProyectosGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProyectosGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProyectosGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
