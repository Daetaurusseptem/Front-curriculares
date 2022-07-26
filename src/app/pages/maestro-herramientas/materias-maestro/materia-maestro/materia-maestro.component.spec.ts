import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaMaestroComponent } from './materia-maestro.component';

describe('MateriaMaestroComponent', () => {
  let component: MateriaMaestroComponent;
  let fixture: ComponentFixture<MateriaMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaMaestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
