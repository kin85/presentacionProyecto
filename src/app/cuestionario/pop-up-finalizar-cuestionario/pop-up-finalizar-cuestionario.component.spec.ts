import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpFinalizarCuestionarioComponent } from './pop-up-finalizar-cuestionario.component';

describe('PopUpFinalizarCuestionarioComponent', () => {
  let component: PopUpFinalizarCuestionarioComponent;
  let fixture: ComponentFixture<PopUpFinalizarCuestionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpFinalizarCuestionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpFinalizarCuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
