import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosGrupoComponent } from './proyectos-grupo.component';

describe('ProyectosGrupoComponent', () => {
  let component: ProyectosGrupoComponent;
  let fixture: ComponentFixture<ProyectosGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
