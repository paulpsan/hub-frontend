import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuariosProyectoComponent } from './admin-usuarios-proyecto.component';

describe('UsuariosProyectoComponent', () => {
  let component: AdminUsuariosProyectoComponent;
  let fixture: ComponentFixture<AdminUsuariosProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsuariosProyectoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsuariosProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
