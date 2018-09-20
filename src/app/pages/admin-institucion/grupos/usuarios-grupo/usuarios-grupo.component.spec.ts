import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosGrupoComponent } from './usuarios-grupo.component';

describe('UsuariosGrupoComponent', () => {
  let component: UsuariosGrupoComponent;
  let fixture: ComponentFixture<UsuariosGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
