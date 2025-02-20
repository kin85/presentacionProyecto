import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadUsuarioComponent } from './actividad-usuario.component';

describe('ActividadUsuarioComponent', () => {
  let component: ActividadUsuarioComponent;
  let fixture: ComponentFixture<ActividadUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
