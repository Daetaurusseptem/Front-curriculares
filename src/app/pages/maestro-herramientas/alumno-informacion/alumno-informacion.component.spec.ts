import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoInformacionComponent } from './alumno-informacion.component';

describe('AlumnoInformacionComponent', () => {
  let component: AlumnoInformacionComponent;
  let fixture: ComponentFixture<AlumnoInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
