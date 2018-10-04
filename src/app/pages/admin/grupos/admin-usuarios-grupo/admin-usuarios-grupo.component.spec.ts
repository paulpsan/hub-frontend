import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuariosGrupoComponent } from './admin-usuarios-grupo.component';

describe('AdminUsuariosGrupoComponent', () => {
  let component: AdminUsuariosGrupoComponent;
  let fixture: ComponentFixture<AdminUsuariosGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsuariosGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsuariosGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
