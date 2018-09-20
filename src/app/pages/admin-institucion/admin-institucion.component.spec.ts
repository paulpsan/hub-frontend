import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInstitucionComponent } from './admin-institucion.component';

describe('AdminInstitucionComponent', () => {
  let component: AdminInstitucionComponent;
  let fixture: ComponentFixture<AdminInstitucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstitucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
